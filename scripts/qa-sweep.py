#!/usr/bin/env python3
"""
Version 5 QA sweep.

Runs against a built and served site, not against source, because most of the
defects worth catching only exist in rendered output. Start the server first:

    NEXT_PUBLIC_SITE_URL=https://viditpujara.qd.je \
    NEXT_PUBLIC_SITE_ENV=production npx next start -p 3100
    python3 scripts/qa-sweep.py http://127.0.0.1:3100

Checks, in order:

  1  every public route returns 200, and an unknown route returns 404
  2  exactly one h1 per page, and no heading level is skipped
  3  canonical, Open Graph, Twitter and JSON-LD are present and parse
  4  robots.txt and sitemap.xml agree with the environment
  5  no confidential string, blocked vendor name or phone number is rendered
  6  no em dash or double hyphen appears in visible copy
  7  every image has alt text, every page has a skip link and one main landmark
  8  no horizontal overflow at 390, 768 and 1440
  9  no interactive target under 24px, ignoring inline links inside sentences
 10  reduced motion delivers every reveal already visible and no packets
 11  keyboard reaches the primary navigation and shows a visible focus ring

Exit status is non zero if anything fails, so this can gate a deploy.
"""

from __future__ import annotations

import json
import re
import sys
import urllib.error
import urllib.request
from html.parser import HTMLParser

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:3100"

ROUTES = [
    "/",
    "/about",
    "/experience",
    "/case-studies",
    "/case-studies/employee-retirement-contribution-synchronization",
    "/case-studies/spend-authorization-to-expense-report-automation",
    "/case-studies/employee-lifecycle-synchronization",
    "/case-studies/employee-bank-account-synchronization",
    "/projects",
    "/projects/sherbimet",
    "/projects/plezer-construction",
    "/projects/triptogether",
    "/projects/pu-nav",
    "/projects/eventos",
    "/skills",
    "/credentials",
    "/resume",
    "/contact",
]

# Client names, vendor names and project codes that must never be rendered.
# Carried forward from the Version 1 to Version 4 privacy reviews.
BLOCKED = [
    "HF",
    "Summit",
    "TIAA",
    "W Energy",
    "ASL",
    "Paylocity",
    "8401005481",
    "+91 8401005481",
    "viditpujara@outlook.com",
    "localhost",
    "vercel.app",
    "Theme Board",
    "Theme Explorer",
    "Authentic Fusion Redwood",
    "Stitch",
    "Hire Consultant",
    "Version 3",
    "Version 4",
]

# Whole word matching, so "Summit" does not fire on "summitted" and short codes
# like HF and ASL do not fire inside ordinary words.
WORDY = {"HF", "ASL", "Summit", "TIAA", "Stitch"}

failures: list[str] = []
notes: list[str] = []


def fail(message: str) -> None:
    failures.append(message)


def get(path: str) -> tuple[int, str]:
    try:
        with urllib.request.urlopen(BASE + path, timeout=20) as response:
            return response.status, response.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as error:
        return error.code, error.read().decode("utf-8", "replace")


class Extract(HTMLParser):
    """Pulls visible text, headings, images, landmarks and JSON-LD."""

    def __init__(self) -> None:
        super().__init__()
        self.text: list[str] = []
        self.headings: list[tuple[int, str]] = []
        self.images: list[dict[str, str]] = []
        self.jsonld: list[str] = []
        self.mains = 0
        self.skip_link = False
        self._skip_depth = 0
        self._heading: int | None = None
        self._buffer: list[str] = []
        self._in_jsonld = False

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag in ("script", "style"):
            if attributes.get("type") == "application/ld+json":
                self._in_jsonld = True
            self._skip_depth += 1
        if tag == "main":
            self.mains += 1
        if tag == "img":
            self.images.append(
                {"src": attributes.get("src") or "", "alt": attributes.get("alt") or ""}
            )
        if tag == "a" and (attributes.get("href") or "").endswith("#main"):
            self.skip_link = True
        if tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self._heading = int(tag[1])
            self._buffer = []

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self._skip_depth = max(0, self._skip_depth - 1)
            self._in_jsonld = False
        if tag in ("h1", "h2", "h3", "h4", "h5", "h6") and self._heading:
            self.headings.append((self._heading, " ".join(self._buffer).strip()))
            self._heading = None

    def handle_data(self, data):
        if self._in_jsonld:
            self.jsonld.append(data)
            return
        if self._skip_depth:
            return
        self.text.append(data)
        if self._heading:
            self._buffer.append(data)


def check_documents() -> None:
    for route in ROUTES:
        status, html = get(route)
        if status != 200:
            fail(f"[1] {route} returned {status}")
            continue

        parser = Extract()
        parser.feed(html)
        visible = re.sub(r"\s+", " ", " ".join(parser.text))

        # 2. headings
        h1s = [text for level, text in parser.headings if level == 1]
        if len(h1s) != 1:
            fail(f"[2] {route} has {len(h1s)} h1 elements")
        levels = [level for level, _ in parser.headings]
        for previous, current in zip(levels, levels[1:]):
            if current > previous + 1:
                fail(f"[2] {route} skips from h{previous} to h{current}")
                break

        # 3. metadata
        canonical = re.search(
            r'<link rel="canonical" href="([^"]+)"', html
        ) or re.search(r'rel="canonical" href="([^"]+)"', html)
        if not canonical:
            fail(f"[3] {route} has no canonical link")
        elif not canonical.group(1).startswith("https://"):
            fail(f"[3] {route} canonical is not absolute https: {canonical.group(1)}")
        for needle in ('property="og:title"', 'name="twitter:card"', 'property="og:image"'):
            if needle not in html:
                fail(f"[3] {route} is missing {needle}")
        for block in parser.jsonld:
            try:
                json.loads(block)
            except json.JSONDecodeError as error:
                fail(f"[3] {route} has invalid JSON-LD: {error}")
        if route == "/" and '"@type":"Person"' not in html.replace(" ", ""):
            fail("[3] / does not publish Person structured data")

        # 5. privacy
        for term in BLOCKED:
            pattern = (
                rf"\b{re.escape(term)}\b" if term in WORDY else re.escape(term)
            )
            if re.search(pattern, visible):
                fail(f"[5] {route} renders blocked string: {term}")
            if re.search(pattern, html):
                fail(f"[5] {route} contains blocked string in markup: {term}")

        # 6. punctuation
        if "\u2014" in visible or "\u2013" in visible:
            fail(f"[6] {route} contains an em or en dash in visible copy")
        if re.search(r"\w--\w", visible):
            fail(f"[6] {route} contains a double hyphen in visible copy")

        # 7. structure
        for image in parser.images:
            if not image["alt"].strip():
                fail(f"[7] {route} has an image with no alt text: {image['src']}")
        if parser.mains != 1:
            fail(f"[7] {route} has {parser.mains} main landmarks")
        if not parser.skip_link:
            fail(f"[7] {route} has no skip link")

    status, _ = get("/this-route-does-not-exist")
    if status != 404:
        fail(f"[1] unknown route returned {status}, expected 404")

    status, robots = get("/robots.txt")
    if status != 200:
        fail(f"[4] robots.txt returned {status}")
    else:
        if "Disallow: /" in robots and "Allow: /" not in robots:
            notes.append("[4] robots.txt disallows everything: not a production build")
        elif "Sitemap:" not in robots:
            fail("[4] production robots.txt has no sitemap line")

    status, sitemap = get("/sitemap.xml")
    if status != 200:
        fail(f"[4] sitemap.xml returned {status}")
    else:
        missing = [route for route in ROUTES if f"<loc>https://" not in sitemap]
        if missing:
            fail("[4] sitemap.xml has no absolute locations")
        count = sitemap.count("<url>")
        if count != len(ROUTES):
            fail(f"[4] sitemap.xml lists {count} urls, expected {len(ROUTES)}")


def check_browser() -> None:
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        notes.append("[8-11] playwright not installed, browser checks skipped")
        return

    sample = [
        "/",
        "/about",
        "/experience",
        "/case-studies",
        "/case-studies/employee-bank-account-synchronization",
        "/projects",
        "/projects/triptogether",
        "/skills",
        "/credentials",
        "/resume",
        "/contact",
    ]

    with sync_playwright() as play:
        browser = play.chromium.launch()

        for width, height in ((390, 844), (768, 1024), (1440, 900)):
            context = browser.new_context(viewport={"width": width, "height": height})
            page = context.new_page()
            errors: list[str] = []
            page.on("pageerror", lambda error: errors.append(str(error)))
            page.on(
                "console",
                lambda message: errors.append(f"console {message.type}: {message.text}")
                if message.type == "error"
                else None,
            )

            for route in sample:
                page.goto(BASE + route, wait_until="domcontentloaded")
                page.wait_for_timeout(900)

                overflow = page.evaluate(
                    "() => document.documentElement.scrollWidth - window.innerWidth"
                )
                if overflow > 1:
                    fail(f"[8] {route} at {width}px overflows by {overflow}px")

                small = page.evaluate(
                    """() => Array.from(document.querySelectorAll('a,button,summary'))
                        .map(el => ({
                            text: (el.textContent || '').trim().slice(0, 40),
                            box: el.getBoundingClientRect(),
                            inline: !!el.closest('p, li.inline-sentence'),
                        }))
                        .filter(item => item.box.width > 0 && item.box.height > 0
                            && item.box.height < 24
                            && item.text !== 'Skip to main content')
                        .map(item => item.text + ' @' + Math.round(item.box.height) + 'px')"""
                )
                if small:
                    fail(f"[9] {route} at {width}px has small targets: {small[:5]}")

            if errors:
                fail(f"[8] javascript errors at {width}px: {errors[:3]}")
            context.close()

        # 10. reduced motion
        context = browser.new_context(
            viewport={"width": 1440, "height": 900}, reduced_motion="reduce"
        )
        page = context.new_page()
        for route in ("/", "/case-studies/employee-bank-account-synchronization"):
            page.goto(BASE + route, wait_until="domcontentloaded")
            page.wait_for_timeout(700)
            hidden = page.evaluate(
                """() => Array.from(document.querySelectorAll('[data-reveal],[data-draw]'))
                    .filter(el => getComputedStyle(el).opacity === '0').length"""
            )
            if hidden:
                fail(f"[10] {route} hides {hidden} elements under reduced motion")
            packets = page.evaluate(
                """() => Array.from(document.querySelectorAll('[data-packet]'))
                    .filter(el => getComputedStyle(el).display !== 'none').length"""
            )
            if packets:
                fail(f"[10] {route} still renders {packets} packets under reduced motion")
            unlit = page.evaluate(
                """() => Array.from(document.querySelectorAll('ol > li[data-state]'))
                    .filter(el => el.dataset.state === 'ahead').length"""
            )
            if unlit:
                fail(f"[10] {route} leaves {unlit} pipeline stages unlit under reduced motion")
        context.close()

        # 11. keyboard
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()
        page.goto(BASE + "/", wait_until="domcontentloaded")
        page.wait_for_timeout(500)
        reached: list[str] = []
        outline_seen = False
        for _ in range(14):
            page.keyboard.press("Tab")
            info = page.evaluate(
                """() => {
                    const el = document.activeElement;
                    if (!el) return null;
                    const style = getComputedStyle(el);
                    return {
                        tag: el.tagName,
                        text: (el.textContent || '').trim().slice(0, 30),
                        outline: style.outlineStyle + ' ' + style.outlineWidth,
                    };
                }"""
            )
            if info:
                reached.append(info["text"])
                if info["outline"] and info["outline"] != "none 0px":
                    outline_seen = True
        if not any("Case studies" in text or "About" in text for text in reached):
            fail(f"[11] keyboard did not reach the primary navigation: {reached[:10]}")
        if not outline_seen:
            fail("[11] no visible focus ring observed while tabbing")
        context.close()
        browser.close()


check_documents()
check_browser()

print(f"QA sweep against {BASE}")
for note in notes:
    print("NOTE  " + note)
if failures:
    print(f"\n{len(failures)} FAILURES")
    for item in failures:
        print("FAIL  " + item)
    sys.exit(1)
print(f"\nPASS  {len(ROUTES)} routes, all checks clean")
