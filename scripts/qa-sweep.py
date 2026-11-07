#!/usr/bin/env python3
"""Explicit environment/origin release checks. Browser checks required unless --http-only."""
import argparse
import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
ROUTES = json.loads((ROOT / 'src/content/routes.json').read_text())
_SITE = (ROOT / 'src/content/site.ts').read_text()
# The only phone number allowed on the site, taken from identity in site.ts.
OWNER_PHONE = tuple(m.group(1) if (m := re.search(key + r':\s*"([^"]+)"', _SITE)) else '' for key in ('phone', 'phoneHref'))

def without_owner_phone(value):
    for item in OWNER_PHONE:
        if item: value = value.replace(item, '')
    return value

class Extract(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonicals, self.meta, self.headings, self.images, self.jsonld, self.text = [], {}, [], [], [], []
        self.mains, self.skip_link, self.hidden, self.block = 0, False, 0, None
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ('script', 'style'):
            self.hidden += 1
            if a.get('type') == 'application/ld+json': self.block = []
        if tag == 'meta': self.meta[a.get('name') or a.get('property')] = a.get('content', '')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonicals.append(a.get('href'))
        if re.fullmatch('h[1-6]', tag): self.headings.append(int(tag[1]))
        if tag == 'img': self.images.append(a)
        if tag == 'main': self.mains += 1
        if tag == 'a' and a.get('href') == '#main': self.skip_link = True
    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.hidden = max(0, self.hidden - 1)
            if self.block is not None:
                self.jsonld.append(''.join(self.block)); self.block = None
    def handle_data(self, data):
        if self.block is not None: self.block.append(data)
        elif not self.hidden: self.text.append(data)

def check_page(html, headers, route, origin, environment, private_terms=()):
    p = Extract(); p.feed(html); errors = []; expected = origin + route
    allowed = {expected, origin} if route == '/' else {expected}
    if len(p.canonicals) != 1 or p.canonicals[0] not in allowed: errors.append('canonical differs from expected origin/route')
    if p.meta.get('og:url') not in allowed: errors.append('Open Graph URL differs from expected route')
    for key in ('og:title', 'og:image', 'twitter:card'):
        if not p.meta.get(key): errors.append('missing ' + key)
    if not p.meta.get('og:image', '').startswith(origin + '/'): errors.append('social image uses a different origin')
    robots = p.meta.get('robots', '').lower()
    directives = robots + ',' + headers.get('x-robots-tag', '').lower()
    if environment == 'production':
        if re.search(r'\b(noindex|none)\b', directives): errors.append('production indexing prohibited')
        if not re.search(r'\bindex\b', robots): errors.append('production index directive missing')
    elif 'noindex' not in robots: errors.append('preview lacks noindex')
    if p.headings.count(1) != 1: errors.append('expected exactly one h1')
    if any(b > a + 1 for a, b in zip(p.headings, p.headings[1:])): errors.append('skipped heading level')
    if p.mains != 1 or not p.skip_link: errors.append('main landmark or skip link missing')
    if any('alt' not in image for image in p.images): errors.append('image alt missing')
    if not p.jsonld: errors.append('structured data missing')
    def visit(value):
        if isinstance(value, dict):
            for key, item in value.items():
                if key == '@id' and isinstance(item, str) and not item.startswith(origin + '/'):
                    errors.append('structured identifier uses a different origin')
                visit(item)
        elif isinstance(value, list):
            for item in value: visit(item)
    for block in p.jsonld:
        try: visit(json.loads(block))
        except json.JSONDecodeError: errors.append('invalid JSON-LD')
    if re.search(r'\+91[\s-]*\d[\d\s-]{8,}', without_owner_phone(' '.join(p.text))) or 'tel:' in without_owner_phone(html): errors.append('public phone detail present')
    for term in private_terms:
        if re.search(r'(?<!\w)' + re.escape(term) + r'(?!\w)', html, re.I): errors.append('private denylist match (value redacted)')
    for name in ('x-content-type-options', 'x-frame-options', 'referrer-policy', 'permissions-policy', 'content-security-policy'):
        if not headers.get(name): errors.append('missing security header: ' + name)
    return errors

def check_robots(text, origin, environment):
    lines = {line.strip().lower() for line in text.splitlines()}
    if environment == 'production':
        if 'allow: /' not in lines or 'disallow: /' in lines: return ['production robots must allow crawling']
        if f'sitemap: {origin}/sitemap.xml'.lower() not in lines: return ['robots sitemap origin mismatch']
    elif 'disallow: /' not in lines or 'allow: /' in lines: return ['preview robots must disallow crawling']
    return []

def check_sitemap(text, origin, routes=ROUTES):
    try: urls = [node.text for node in ET.fromstring(text).findall('{*}url/{*}loc')]
    except ET.ParseError: return ['invalid sitemap XML']
    if len(urls) != len(set(urls)) or set(urls) != {origin + route for route in routes}:
        return ['sitemap must contain every expected canonical URL exactly once']
    return []

class _NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None

def check_legacy_redirects(base, origin):
    """Old version hosts must 308 to the canonical origin with the same path (local builds only)."""
    errors = []
    opener = urllib.request.build_opener(_NoRedirect)
    for host in [f'{prefix}.viditpujara.me' for prefix in ('v1', 'v2', 'v3', 'v4', 'v5', 'www')]:
        for route in ['/'] + [r for r in ROUTES if r.startswith('/case-studies/')][:1]:
            request = urllib.request.Request(base.rstrip('/') + route, headers={'Host': host})
            try: response = opener.open(request, timeout=30)
            except urllib.error.HTTPError as error: response = error
            expected = origin + (route if route != '/' else '/')
            if response.status != 308 or response.headers.get('location', '').rstrip('/') != expected.rstrip('/'):
                errors.append(f'{host}{route}: expected 308 to {expected}, got {response.status} {response.headers.get("location")}')
    return errors

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('base', nargs='?', default='http://127.0.0.1:3100')
    parser.add_argument('--origin', required=True)
    parser.add_argument('--environment', choices=['production', 'preview'], required=True)
    parser.add_argument('--http-only', action='store_true', help='Explicit HTTP-only coverage, not a complete release pass')
    args = parser.parse_args(); origin = args.origin.rstrip('/'); errors = []
    terms = Path(os.environ.get('QA_PRIVATE_TERMS_FILE', ROOT / '.qa-private.json'))
    private = json.loads(terms.read_text()) if terms.exists() else []
    def get(route):
        try: response = urllib.request.urlopen(args.base.rstrip('/') + route, timeout=30)
        except urllib.error.HTTPError as error: response = error
        return response.status, response.read(), {k.lower(): v for k, v in response.headers.items()}
    for route in ROUTES:
        status, body, headers = get(route)
        errors.extend([f'{route}: status {status}'] if status != 200 else
                      [f'{route}: {e}' for e in check_page(body.decode(), headers, route, origin, args.environment, private)])
    if urllib.parse.urlparse(args.base).hostname in ('127.0.0.1', 'localhost'):
        errors.extend(check_legacy_redirects(args.base, origin))
    status, _, _ = get('/this-route-does-not-exist')
    if status != 404: errors.append('unknown route must return 404')
    for path, checker in [('/robots.txt', lambda t: check_robots(t, origin, args.environment)),
                          ('/sitemap.xml', lambda t: check_sitemap(t, origin))]:
        status, body, _ = get(path)
        errors.extend([f'{path}: status {status}'] if status != 200 else checker(body.decode()))
    status, body, headers = get('/vidit-pujara-oracle-fusion-technical-consultant-resume.pdf')
    if status != 200 or not body.startswith(b'%PDF-') or 'application/pdf' not in headers.get('content-type', ''):
        errors.append('resume download must return a PDF with HTTP 200')
    if errors:
        for error in errors: print('FAIL ' + error)
        return 1
    print(f'PASS HTTP/content: {len(ROUTES)} routes, {args.environment}, canonical {origin}', flush=True)
    if args.http_only:
        print('INCOMPLETE RELEASE COVERAGE: browser checks intentionally not run (--http-only).'); return 0
    result = subprocess.run(['node', 'node_modules/@playwright/test/cli.js', 'test'], cwd=ROOT,
                            env={**os.environ, 'BASE_URL': args.base.rstrip('/')})
    if result.returncode:
        print('FAIL required browser checks did not pass'); return 1
    print('PASS release checks: HTTP/content and browser coverage completed.'); return 0
if __name__ == '__main__': sys.exit(main())
