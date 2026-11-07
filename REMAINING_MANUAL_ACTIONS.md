# Remaining account-side actions

Updated 1 November 2026. Local code changes and verification are tracked in
`docs/audit/IMPLEMENTATION_STATUS.md`.

1. **TripTogether incident:** identify exposed key types; revoke actual secrets at
   the providers, review usage/billing, keep Gemini server-side, verify database
   RLS/auth boundaries, then coordinate repository/history/build-artifact cleanup.
   The portfolio's direct repo link is already withheld. Keep it withheld until
   completion is verified. Existing clones/forks may retain historical values.
2. **Vercel Production:** set `NEXT_PUBLIC_SITE_URL=https://viditpujara.me` and
   `NEXT_PUBLIC_SITE_ENV=production`, build/deploy the reviewed commit, and verify
   live robots/canonicals/sitemap and the PDF. Leave Preview non-production.
   No hosting credentials or connected browser session were available in this task.
3. **Domain routing:** `next.config.ts` now redirects v1–v5 and www to the canonical `.me`
   site (same path) for hosts this app serves, once deployed. Still to do at the hosting
   layer: v3 and v4 (separate deployments serving older copies) and v1 and v2 (404) need
   a permanent redirect to `.me` or their domain removed. The domain already exists;
   buying another domain is not a prerequisite.
4. **Search Console:** verify ownership, submit the `.me` sitemap, inspect canonical.
5. **Public history/privacy:** coordinate removal of the former private QA fixture
   from Git history where required. Its values have been removed from current code;
   no local or remote history rewrite has been performed.
6. **Professional profiles:** align LinkedIn's employment title to Consultant I and
   headline to Fusion/OIC; review GitHub bio/pins before restoring its résumé link.
   These accounts have not been changed.
7. **Development-tool advisories:** review the 16 moderate ESLint/minimatch-chain
   findings by 1 December 2026. Current scan has no high/critical or non-dev findings.
   Do not apply npm's incompatible ESLint 4 / Next-config 12 downgrade suggestions.

No concurrent support count, additional keyword claims or second implementation
specifics were invented. The corrected PDF has been supplied locally and linked;
there is no longer a missing-résumé-file blocker. No OIC certification is claimed.
