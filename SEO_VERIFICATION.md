# SEO verification, Version 5

Everything below was checked against a production mode build served locally,
using `scripts/qa-sweep.py` and direct inspection of the generated HTML.

## Central configuration

All SEO output derives from two environment variables and one route list:

- `NEXT_PUBLIC_SITE_URL` sets `metadataBase`, every canonical, every Open Graph
  URL, every sitemap entry and every JSON-LD identifier. No domain is hardcoded
  anywhere in the source.
- `NEXT_PUBLIC_SITE_ENV` gates indexing. Only the exact value `production`
  produces an indexable site.
- `allRoutes` in `src/content/site.ts` is the single source for the sitemap, so
  a page cannot ship without being listed.

## Per route metadata

Every one of the 18 routes has its own title, description, canonical, Open
Graph block and Twitter card, built by `pageMetadata()` in `src/lib/seo.ts`.
Titles use a template so each page reads as `Page | Vidit Pujara`, with the
homepage carrying the full `Vidit Pujara | Oracle ERP Technical Consultant`.

Descriptions are written per route and lead with the specialisation, so the
search snippet states Oracle Integration Cloud, Oracle Fusion HCM and Oracle
Fusion Financials rather than a generic portfolio phrase. Keyword arrays are
present but treated as a minor signal, not a ranking strategy.

Verified: canonical present and absolute `https` on all 18 routes;
`og:title`, `og:image` and `twitter:card` present on all 18 routes.

## Structured data

| Schema | Where |
| --- | --- |
| `Person` | Site wide, in the root layout, with job title, employer, locality, `knowsAbout` and `sameAs` for LinkedIn and GitHub |
| `WebSite` | Site wide, publisher linked to the Person node |
| `ProfilePage` | Homepage, about, résumé |
| `TechArticle` | Each case study and each project page, authored by the Person node |
| `BreadcrumbList` | Every route below the homepage |
| `ItemList` | Case studies index and projects index |

All JSON-LD is emitted through one component that escapes the closing script
sequence. Every block on every route parses as valid JSON, verified by the
sweep.

## Sitemap and robots

`/sitemap.xml` lists exactly 18 absolute URLs with last modified dates and a
priority that favours the homepage and top level pages over detail pages.

`/robots.txt` depends on the environment:

- production: allow all, plus a `Sitemap:` line and a `host` entry
- anything else: `Disallow: /`

Preview deployments therefore cannot be indexed and cannot publish a canonical
pointing at a preview host. Both behaviours were exercised: the disallow all
form appears without the production flag, and the allow plus sitemap form
appears with it.

## Crawlability and internal linking

Navigation is real anchors in a `nav` landmark, present in the server rendered
HTML on every route. Every page is reachable from the header, the footer or
both. Detail pages are reachable from their index, and each case study links to
the next one, so no page is more than two clicks from the homepage. The
`404` page lists every route and is marked `noindex`.

## Media

The social card is a locally generated 1200x630 PNG referenced absolutely
through `metadataBase`. The portrait is served through `next/image` with
explicit dimensions, so it reserves layout space and cannot shift the page.
Every image carries descriptive alt text.

## Semantics

One `h1` per route, no skipped heading levels, verified across all 18 routes.
Section headings are real `h2` and `h3` elements rather than styled text.
Figures use `figure` and `figcaption`, and each carries a text alternative.

## What is not claimed

No ranking is promised. No structured data is emitted for anything the site does
not actually contain. No `Organization` schema is published, because Vidit is
not an organisation and claiming one would misrepresent the entity.

## After the domain is live

See `DOMAIN_AND_SEARCH_SETUP.md` for Search Console verification and submission.
