import importlib.util
from pathlib import Path
import unittest
from unittest.mock import patch
from types import SimpleNamespace
from io import StringIO

spec = importlib.util.spec_from_file_location("qa", Path(__file__).resolve().parents[1] / "scripts/qa-sweep.py")
qa = importlib.util.module_from_spec(spec)
spec.loader.exec_module(qa)

class ReleaseRegressions(unittest.TestCase):
    def test_production_disallow_is_failure(self):
        self.assertTrue(qa.check_robots("User-Agent: *\nDisallow: /", "https://example.com", "production"))
        self.assertFalse(qa.check_robots("User-Agent: *\nDisallow: /", "https://example.com", "preview"))

    def test_sitemap_exact_set_and_duplicates(self):
        def xml(urls):
            return '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + ''.join(f'<url><loc>{u}</loc></url>' for u in urls) + '</urlset>'
        origin = 'https://example.com'
        self.assertFalse(qa.check_sitemap(xml([origin+'/', origin+'/about']), origin, ['/', '/about']))
        for urls in [[origin+'/', origin+'/'], ['https://wrong.example/', origin+'/about'], [origin+'/']]:
            self.assertTrue(qa.check_sitemap(xml(urls), origin, ['/', '/about']))

    def test_wrong_https_origin_and_noindex_do_not_pass(self):
        html = '<link rel="canonical" href="https://wrong.example/"><meta name="robots" content="noindex, nofollow">'
        errors = qa.check_page(html, {}, '/', 'https://example.com', 'production')
        self.assertIn('canonical differs from expected origin/route', errors)
        self.assertIn('production indexing prohibited', errors)

    def test_header_noindex_is_failure(self):
        errors = qa.check_page('<meta name="robots" content="index,follow">', {'x-robots-tag':'noindex'}, '/', 'https://example.com', 'production')
        self.assertIn('production indexing prohibited', errors)

    def test_only_the_owner_phone_is_allowed(self):
        phone, href = qa.OWNER_PHONE
        self.assertTrue(phone and href)
        def check(body):
            return qa.check_page(f'<main><h1>x</h1>{body}</main>', {}, '/', 'https://example.com', 'production')
        self.assertNotIn('public phone detail present', check(f'<a href="{href}">{phone}</a>'))
        self.assertIn('public phone detail present', check('<a href="tel:+911234567890">+91 1234567890</a>'))

    def test_failed_browser_process_fails_release(self):
        origin = 'https://example.com'
        headers = {name: 'present' for name in ['x-content-type-options','x-frame-options','referrer-policy','permissions-policy','content-security-policy']}
        html = ('<link rel="canonical" href="https://example.com/">'
                '<meta property="og:url" content="https://example.com/">'
                '<meta property="og:title" content="Example">'
                '<meta property="og:image" content="https://example.com/image.png">'
                '<meta name="twitter:card" content="summary_large_image">'
                '<meta name="robots" content="index,follow">'
                '<script type="application/ld+json">{"@type":"Person"}</script>'
                '<a href="#main">Skip</a><main><h1>Example</h1></main>')
        def response(url, timeout):
            path = url.removeprefix('http://127.0.0.1:3100')
            bodies = {'/': html, '/robots.txt': 'Allow: /\nSitemap: https://example.com/sitemap.xml',
                      '/sitemap.xml': '<urlset><url><loc>https://example.com/</loc></url></urlset>',
                      '/vidit-pujara-oracle-fusion-technical-consultant-resume.pdf': '%PDF-1.4'}
            body = bodies.get(path, '')
            return SimpleNamespace(status=200 if path in bodies else 404,
                                   read=lambda: body.encode(), headers={**headers, 'content-type':'application/pdf'})
        with patch.object(qa, 'ROUTES', ['/']), patch.object(qa, 'check_sitemap', return_value=[]), \
             patch.object(qa.urllib.request, 'urlopen', side_effect=response), \
             patch.object(qa.subprocess, 'run', return_value=SimpleNamespace(returncode=1)), \
             patch('sys.argv', ['qa', '--origin', origin, '--environment', 'production']), \
             patch('sys.stdout', new_callable=StringIO) as output:
            self.assertEqual(qa.main(), 1)
            self.assertIn('FAIL required browser checks', output.getvalue())

if __name__ == '__main__': unittest.main()
