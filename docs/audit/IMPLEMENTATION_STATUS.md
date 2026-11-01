# Implementation status

Updated 1 November 2026. Release branch: `codex/portfolio-production-readiness`, based on `24f1abc`.
No production deployment, provider credential change or remote history rewrite is claimed.

## Implemented locally

- Next.js and eslint-config-next upgraded to **16.4.3**. Lockfile refreshed with
  **sharp 0.35.5**, **source-map-js 1.2.2**, **js-yaml 4.3.2**, patched brace-expansion
  copies and **zod 4.6.7**. No incompatible lint downgrade or major override applied.
- Official employment designation is **Consultant I**; public headline is
  **Oracle Fusion Technical Consultant**, with OIC specialization. Repeated formal
  facts derive from identity content. Homepage title, metadata, captions and the
  regenerated social card are aligned.
- Multi-client OIC production support and separate Oracle ADF support are included
  under Mastek. The old numeric support claim is removed from copy, metrics, chart
  rows and text alternatives. No concurrent count is invented.
- Case-study summaries/role context improved; PL/SQL surfaced; older unrelated skills
  removed from the main skills band. Unsupported new keywords and career-title
  changes were not introduced. Sherbimet query wording corrected.
- Corrected two-page public résumé generated from editable `docs/resume.json`:
  Consultant I, certifications, approximate ranges, generic client descriptions,
  no phone or tel annotation, no GitHub link, and no generic second-project block.
  The original Downloads PDF is unchanged. `/resume` offers Download and Print.
- TripTogether's direct external repository action is withheld. This is containment;
  it does not establish provider revocation or safe database authorization.
- Production origin/flag validation rejects malformed, missing or preview configuration.
  The default preview canonical is `.me`, with noindex/disallow. Sitemap/QA use a
  shared route inventory checked against files/content. Artificial sitemap dates removed.
- Private denylist literals moved out of tracked code to an ignored local fixture;
  environment ignores tightened; redacted local credential scanner and Gitleaks CI added.
- Security response headers added. Structural CSP restrictions are enforced; a
  compatible broader resource policy is Report-Only with inline hydration/styles
  allowed. This is not a strict script-execution policy.
- Native modal dialog fixes focus containment/background inertness; closes on
  navigation/desktop resize and restores focus/scroll. No-JavaScript navigation added.
- Reduced-motion hero/route entrance delays removed after screenshot review exposed
  a first-paint visibility gap. Regression coverage includes entrance animations.
- Release QA checks exact origins/routes, robots meta/headers, sitemap URL sets,
  public PDF delivery and required browser coverage. Regression tests and a two-mode
  GitHub Actions workflow added. CI is configured but has not run remotely.

## Verification evidence

- Production and preview builds compile using `next build --webpack`, generating
  22 build entries / 18 public content routes. Turbopack was attempted but cannot
  bind its worker port in this environment; Webpack is the supported build path.
- TypeScript, ESLint, **4 environment/content tests** and **5 release-regression tests** pass.
- Production HTTP/content sweep passes all 18 routes, unknown-route 404, exact
  canonical/OG/schema origins, sitemap/robots behavior, headers and PDF response.
- Preview HTTP/content sweep passes all 18 routes with noindex/disallow.
- **7 Playwright tests pass in both modes**: all 18 routes at 390/768/1440 pixels,
  mobile keyboard/modal behavior, download and link containment, reduced motion,
  and navigation without JavaScript. Final production checks are refreshed after
  restoring the production build.
- Both final PDF pages rendered and visually inspected: no clipping, overlaps or
  blank pages. Text/metadata/annotations verified with Poppler and pypdf; fonts
  embedded; two A4 pages, intended HTTPS/mailto links, no phone/forms/encryption.
  The PDF remains untagged; no claim of complete PDF accessibility is made.
- Homepage mobile/desktop captures and social card inspected. Updated home captures
  live in `docs/screenshots/`; other original captures are explicitly historical.
- Gitleaks **8.30.1**, downloaded from its official release and checksum-verified,
  reports **0 findings across the 3 reachable historical commits**. The smaller
  offline guard also checks current tracked/untracked non-ignored files. These
  results do not scan TripTogether or erase the former private fixture from history.

## Dependency advisory outcome

Initial audit: **22 affected entries: 1 critical, 5 high, 16 moderate**.
After compatible upgrades: **16 moderate, 0 high, 0 critical**; all remaining
findings are development-tool chain entries propagated from minimatch.
The production-only audit reports **0 vulnerabilities**.

Raw before/after results are retained alongside this file. Findings are npm package
entries, not independent exploits. Reachability was not established by exploitation.

The remaining development dependency advisory affects attacker-controlled glob
patterns; this portfolio does not expose lint/glob processing through HTTP. Current
maintainer ranges include minimatch 3/10, while the advisory fix is 11.0.1. Forcing
the major override or npm's suggested ESLint 4 / eslint-config-next 12 downgrade is
not a safe compatibility fix. This is an **open moderate development-tool issue**,
not a clean all-dependency audit. Recheck compatible upstream fixes by **1 December
2026**. CI rejects production high/critical advisories and runs normal lint/tests.

## Remaining external work

- Vercel integration was found and offered, but no connection is confirmed. There
  is no available browser session or deployment CLI. Set the Production build
  variables and deploy this reviewed change once the hosting account is connected;
  then verify live output. Local success does not repair the existing deployment.
- Rotate/revoke exposed TripTogether secrets, verify key types and RLS/backend
  authorization, then coordinate remote history/cached-artifact cleanup. Keep the
  repository link withheld until verified.
- Configure historical-host/www permanent redirects and Search Console verification.
- Assess and coordinate the old QA fixture's Git history cleanup. Current code no
  longer embeds its private values; reachable history still can.
- Align LinkedIn/GitHub account content; no accounts or messages were changed.
- Concurrent environment count and optional extra keyword claims remain unverified;
  site and PDF use only supplied evidence.

See `REMAINING_MANUAL_ACTIONS.md` for the ordered account checklist. These are concrete
access/verification limits; they are not represented as completed security actions.

## Release preparation

The verified implementation is prepared as a local release commit. See
`RELEASE_HANDOFF.md` for the concrete deployment sequence and pull-request text.
No change to the live site or destructive remote Git operation is included in
this preparation. Remote publication requires an authenticated GitHub connection;
host settings/deployment require Vercel access.

A GitHub dry-run write-access check was blocked by automatic approval review
because remote publication was not explicitly authorized and branch metadata
could be disclosed. No remote check or push was performed. Explicit approval
is required before publishing this branch; Vercel and GitHub integrations are
still unconnected.
