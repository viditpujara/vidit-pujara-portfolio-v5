# SEO configuration and verification

Updated 1 November 2026. Current local results are recorded in
`docs/audit/IMPLEMENTATION_STATUS.md`; the older live audit remains dated evidence.

- Production must supply `NEXT_PUBLIC_SITE_URL=https://viditpujara.me` and
  `NEXT_PUBLIC_SITE_ENV=production` at build time. Missing/malformed configuration
  fails before publication. Vercel preview context cannot enable production indexing.
- Local/preview builds remain noindex and disallow crawling. Their default canonical
  is the known `.me` origin, never an ephemeral Vercel host.
- Canonicals, Open Graph URLs and JSON-LD identifiers derive from the validated origin.
- `src/content/routes.json` supplies all 18 sitemap/QA paths. Tests compare the list
  with route files and content detail slugs and reject duplicate/missing entries.
- Sitemap entries do not invent a fresh lastModified date for unchanged pages.
- Route descriptions and public titles reflect Fusion/OIC positioning. The homepage
  uses an absolute title to avoid repeating the name through the title template.
- The regenerated social card includes the public headline and Consultant I role.
- HTTP QA checks exact canonicals, OG URLs, schema IDs, HTML/header robots directives,
  production/preview robots behavior and the precise sitemap URL set.
- Browser checks are mandatory for a complete release pass. An explicit HTTP-only
  run labels coverage incomplete; missing browser tooling is a failure in release mode.

After deploying the reviewed build, recheck the live origin and historical-host
redirects, verify Search Console ownership, submit the sitemap and inspect Google's
selected canonical. Correct metadata allows crawling; indexing is not guaranteed.
