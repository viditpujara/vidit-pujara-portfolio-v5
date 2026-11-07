# Canonical domain and search setup

The existing canonical domain is `https://viditpujara.me`.

1. On the Vercel project serving that host, set Production build variables:
   `NEXT_PUBLIC_SITE_URL=https://viditpujara.me` and `NEXT_PUBLIC_SITE_ENV=production`.
2. Keep Preview/Development set to `preview` or unset. Copying the example file's
   preview flag into Production now fails the build rather than shipping noindex.
3. Deploy a fresh reviewed build. Runtime variable changes do not repair statically
   generated metadata from an old build.
4. Redirect historical v1–v5 and www hosts permanently to the canonical host, keeping
   valid paths. `next.config.ts` now does this for any of those hosts that this app
   serves (a 308 to `https://viditpujara.me` with the same path; the canonical host never
   redirects, so there is no loop). It only takes effect once this build is deployed.
   Hosts served by a different deployment or that no longer resolve to a project
   are not covered: on 7 November 2026 `v5` and `www` served this site, `v3` and `v4`
   still served older copies (they look like separate Vercel projects) and `v1` and `v2`
   returned 404. Those need a redirect (or their domain removed) at the hosting/domain
   layer. Keep branch preview hosts noindex.
5. Check live HTML: exact `.me` canonical, correct public title and index/follow;
   robots Allow plus `.me` sitemap; all 18 sitemap entries on `.me`; no header noindex.
6. Verify Search Console ownership (DNS preferred). If using HTML verification, set
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and rebuild. Submit the sitemap and inspect
   the selected canonical. Correct configuration does not guarantee immediate indexing.

No DNS, redirect, Search Console or production environment account setting is
changed by editing this file. Record the actual deployed commit and live checks
in the implementation status when those account-side actions are completed.
