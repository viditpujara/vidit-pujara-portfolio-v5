# Release handoff

Prepared 1 November 2026 from `24f1abc` on local branch
`codex/portfolio-production-readiness`.

## Pull request

Title: Align professional content and resume, repair SEO configuration, and harden the portfolio

The portfolio currently serves noindex with Vercel-host canonical URLs, carries an
outdated employment designation/support count, and has no reviewed PDF download.
This change separates the confirmed Consultant I designation from the public
Oracle Fusion/OIC headline, adds concurrent OIC and ADF support, supplies the
corrected two-page public resume, and rejects invalid production/preview SEO
configuration before release.

It also upgrades Next.js to 16.4.3 and compatible transitive fixes, withholds
TripTogether's direct repository link, adds security headers, replaces mobile
navigation with a native modal dialog, repairs reduced-motion first-paint
visibility and adds production/preview release checks and CI.

Validation: TypeScript and ESLint; 4 environment/content tests; 5 release-regression
tests; production and preview builds; all 18 routes checked at 390/768/1440 pixels;
7 browser tests in each mode; PDF text/annotation/layout checks; redacted
credential-pattern and reachable-history Gitleaks scans. Production dependency
audit reports zero vulnerabilities. The 16 moderate minimatch/lint-chain
findings remain open development-tool issues with a 1 December 2026 review date.

No provider credentials have been rotated and no Git history has been rewritten.
The original supplied PDF is untouched. The public PDF is a corrected derivative.

## Deployment sequence

1. Publish the release branch and open the PR. Run the new CI matrix and inspect
   the Vercel preview. Keep preview indexing disabled.
2. Before merging/deploying Production, select the existing Vercel project serving
   `viditpujara.me` and set its **Production build** variables:
   `NEXT_PUBLIC_SITE_URL=https://viditpujara.me` and
   `NEXT_PUBLIC_SITE_ENV=production`. Keep Preview non-production. No service secret
   is needed by this portfolio.
3. Merge the reviewed PR and deploy that exact commit. The new guard intentionally
   fails a production build with missing values; this must not be bypassed.
4. Run the live HTTP release check from the reviewed checkout:

   ```bash
   python3 scripts/qa-sweep.py https://viditpujara.me --origin https://viditpujara.me --environment production --http-only
   ```

   This labels browser coverage incomplete. Follow with the browser suite against
   the live origin when the hosting account permits it:

   ```bash
   BASE_URL=https://viditpujara.me npm run test:browser
   ```

5. Confirm `.me` canonicals/OG/schema IDs, Allow robots and `.me` sitemap, the public
   PDF response, headers and unknown-route 404. Save the deployed commit and actual
   results in IMPLEMENTATION_STATUS.md.
6. Configure historical-host/www redirects separately at the domain/hosting layer,
   then verify destination/path and absence of loops. Complete Search Console
   verification and sitemap submission.

## Recovery

Retain the previously deployed version in Vercel before release. If the new release
fails after deployment, redeploy the previous version through the hosting dashboard,
then investigate the failed commit/CI result. Recheck canonical/indexing output on
any rollback: the original deployment had known SEO defects. Do not “fix” a failed
build by disabling validation or changing preview flags to production.

TripTogether's external action stays withheld until provider revocation, RLS/auth
review and repository/history cleanup are evidenced. Removing the link does not
make a leaked credential safe.
