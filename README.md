# Vidit Pujara, portfolio Version 5

A production Next.js portfolio for an Oracle ERP Technical Consultant. Version 5
is a new design, a new interaction model and a new motion system built on the
factual content verified across Versions 1 to 4.

Versions 1 to 4 are untouched. This project was created separately.

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

Checks, all of which must pass before a deploy:

```bash
npm run typecheck    # tsc --noEmit, strict, noUncheckedIndexedAccess
npm run lint         # eslint flat config, eslint-config-next 16
npm run build        # 22 static routes
```

The full sweep runs against a served build rather than against source, because
most defects worth catching only exist in rendered output:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example \
NEXT_PUBLIC_SITE_ENV=production npx next start -p 3100 &
python3 scripts/qa-sweep.py http://127.0.0.1:3100
```

---

## Environment variables

| Variable | Required | Effect |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | The canonical production origin, no trailing slash. Every canonical URL, Open Graph URL, sitemap entry and JSON-LD identifier is derived from it. |
| `NEXT_PUBLIC_SITE_ENV` | Yes on production | Must be exactly `production` on the production deployment. Any other value ships `noindex, nofollow` on every route and a disallow all `robots.txt`. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Google Search Console HTML tag token, emitted only when set. |

`.env.example` documents the same three. There are no secrets: nothing in this
project talks to a private service.

**The failure mode to avoid:** forgetting `NEXT_PUBLIC_SITE_ENV=production` on
the production deployment. The site will build and serve perfectly and will not
be indexed. This is deliberate, because the opposite default lets every preview
deployment compete with the real origin.

---

## Deploying to Vercel

1. Push this directory to its own repository.
2. Import it in Vercel. The framework preset is detected; no build overrides.
3. Add both required environment variables to the **Production** environment.
4. For **Preview** and **Development**, set `NEXT_PUBLIC_SITE_ENV` to `preview`
   or leave it unset. Previews then serve `noindex` and disallow crawlers.
5. Deploy, then confirm on the live origin:
   - `/robots.txt` allows crawling and names the sitemap
   - `/sitemap.xml` lists 18 absolute URLs on the production origin
   - any page's canonical points at the production origin

No machine specific dependency exists. Fonts are self hosted, images are local,
and there are no API routes, no database and no third party scripts.

---

## Architecture

```
src/
  app/                 18 public routes plus 404, robots and sitemap
  content/             the only place professional facts are written
    site.ts            identity, navigation, route list, portrait, social image
    pages.ts           page copy: home, about, experience, skills, credentials,
                       resume, contact
    case-studies.ts    four enterprise case studies, each with its flow figure
    projects.ts        five independent projects, with attribution
    metrics.ts         delivery figures and the four quantitative graphs
    figures.ts         working shape, environment progression, career direction
  components/
    primitives/        Console, Record, Seam, SectionHead, Action, Note, DataRow
    figures/           Pipeline, HeroInstrument, Numbers, Tracks
    layout/            SiteHeader, SiteFooter, SectionIndex
    sections/          index rows for case studies, projects, capabilities
    ui/                RevealEngine, RouteTransition, StructuredData, hooks
  lib/seo.ts           metadata builder, canonicals, JSON-LD graphs
  fonts/               two self hosted variable woff2 files
scripts/qa-sweep.py    the check battery described above
```

**Content is separated from presentation.** A page composes primitives and reads
facts from `src/content`. No component restates a fact, so a correction is made
in exactly one place. Route lists, navigation and the sitemap all derive from
`allRoutes` in `site.ts`, so a new page cannot be added without appearing in the
sitemap.

### Stack

Next.js 16 App Router, React 19.2, TypeScript strict with
`noUncheckedIndexedAccess`, Tailwind CSS v4.

**No animation library.** Every motion in this site is CSS transitions, CSS
keyframes, `offset-path`, or one shared `IntersectionObserver`. A framework was
considered and rejected: the interaction here is arrival choreography and one
stepped sequence, neither of which needs a runtime. The whole motion system is a
few hundred bytes of client JavaScript.

### Fonts

Archivo (display and body) and JetBrains Mono (data), both self hosted as
variable woff2 files copied out of `@fontsource` into `src/fonts` and loaded
with `next/font/local`. `fonts.googleapis.com` is unreachable from the build
environment, and a portfolio should not depend on a third party font host in
production either. Archivo carries a width axis, which the display classes drive
directly: headings sit at `wdth` 84 to 90, body text at 100.

---

## The design system in one paragraph

Two registers. **Console** is a deep petrol surface with an engraved lattice,
used for anything about systems in motion. **Record** is a cool paper surface
used for anything that makes a claim. Sections alternate, and the seam between
them is a labelled junction. Six signal colours carry fixed meanings in every
figure: source, in flight, orchestration, technique, Oracle Fusion,
reconciliation. Full detail is in `V5_DESIGN.md`.

---

## Accessibility

Semantic landmarks, one `h1` per page, no skipped heading levels, a skip link,
visible focus rings on both registers, `aria-current` on the active navigation
item, a mobile sheet that traps nothing but moves focus and closes on Escape,
alt text on every image, and a text alternative for every figure. Each pipeline
publishes a "Read this figure as text" disclosure carrying its full alt
sequence, and the bar charts are `aria-hidden` while their numbers are text.

**Reduced motion is a complete experience, not a degraded one.** Every reveal is
already visible, every pipeline stage is lit on first paint, counters render
their final values, and travelling packets are removed. Without JavaScript, a
`noscript` rule releases every reveal, so no content is ever trapped behind an
observer.

---

## Documents in this repository

| File | Contents |
| --- | --- |
| `V5_DESIGN.md` | Design system, motion language, and what was carried, changed or dropped from Versions 1 to 4 |
| `CONTENT_VERIFICATION.md` | Every published claim, its source, and the two content edits made in Version 5 |
| `PRIVACY_REVIEW.md` | Confidentiality rules and the blocked string scan |
| `SEO_VERIFICATION.md` | Metadata, canonicals, structured data, sitemap and robots behaviour |
| `DOMAIN_AND_SEARCH_SETUP.md` | Domain options and Google Search Console steps |
| `REMAINING_MANUAL_ACTIONS.md` | What still requires a human, in priority order |
