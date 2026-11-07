---
task-id: 2026-11-07-case-study-routes
agent: claude-code
platform: Claude Code desktop app (Code tab)
model: Claude Sonnet 5.5 (claude-sonnet-5-5), as stated by the session
rules-version: 1
description: Redirect old version hosts and alternative URLs to the canonical site
started: 2026-11-07
requirements: none (owner request in chat)
branch: agent/claude-code/2026-11-07-case-study-routes
status: ready-for-review
commits: see `git log agent/claude-code/2026-11-07-case-study-routes`
pr: https://github.com/viditpujara/vidit-pujara-portfolio-v5/pull/5
continues:
depends-on:
---

# Case study routes and redirects

## A. Task summary

- **Requested:** "there are a few pages on the portfolio website that are not redirecting, like in the case study. If you open a specific case study, it's not redirecting. Fix the routes."
- **Why:** the request does not say which URL fails, so it was reproduced first (section B). The one clear gap is that old version hosts serve their own copy of every page instead of sending visitors to `viditpujara.me`.
- **Expected outcome:** a case study (or any page) opened on an old version host lands on the same path at the canonical host; a few plausible alternative URLs resolve.
- **Scope / exclusions:** code and docs only. No hosting, DNS or Vercel settings were changed.

## B. Initial analysis

- Reproduced locally on a production build: clicking a case study from `/case-studies` navigates correctly; the header links, the "Read next" and "All case studies" links on a case study page work; the mobile menu opened on a case study page navigates correctly. Every `href` on a case study page is a correct absolute path. Live `viditpujara.me` serves all four case-study URLs with 200, redirects a trailing slash with 308 and returns 404 for unknown slugs.
- Live check on 7 November 2026: `v3`, `v4` and `v5` serve the same case-study paths themselves (200, no redirect), `v1` and `v2` return 404, `www` already redirects with 308.
- Vercel access was not available (the account needs re-authorisation), so which project serves `v3` and `v4` was not confirmed. They serve older copies (older title, noindex), so they are probably separate deployments.
- Interpretation: "not redirecting" most plausibly means old-version hosts staying on their own domain. This is the open item "Domain routing" in `REMAINING_MANUAL_ACTIONS.md`. If the owner meant something else, the reproduction above shows in-site navigation is not the cause.

## C. Implementation plan

- Add host-based permanent redirects in `next.config.ts` for `v1` to `v5` and `www`, destination `https://viditpujara.me/:path*`, plus `/case-study`, `/case-study/:slug` and the old `/projects/triptogether-planner` slug.
- Test the config; add an HTTP check to the QA sweep for local builds; update the domain docs.
- **Owner approval:** the owner asked in chat to fix the routes; the interpretation above was chosen by the agent and is stated here and in the PR.

## D. Implementation record

- **Modified:** `next.config.ts` (`redirects()`), `scripts/qa-sweep.py` (`check_legacy_redirects`, run against local builds only), `tests/environment.test.mjs` (config test), `tests/test_qa.py` (the existing release test patches the new check), `DOMAIN_AND_SEARCH_SETUP.md`, `REMAINING_MANUAL_ACTIONS.md`, `docs/agents/claude-code/README.md`.
- **Created:** this record. **Removed:** none.
- **Behavioural changes:** requests whose `Host` is `v1`–`v5` or `www` `.viditpujara.me` get a 308 to the canonical origin with the same path; `/case-study`, `/case-study/:slug` and `/projects/triptogether-planner` get a 308 to their canonical routes. Nothing changes for the canonical host.
- **Deviations:** none.

## E. Technical decisions

- **Redirects in `next.config.ts` rather than only in hosting settings:** they are version-controlled and testable, and work for any host this deployment serves. They cannot help hosts served by other deployments, which still need hosting-layer redirects (documented).
- **308 (permanent):** matches the existing `www` behaviour.
- **Canonical origin hard-coded in the config** and asserted equal to `canonicalOrigin` in `src/lib/environment.ts` by a test, because the config cannot import that file without an extension under Node's type stripping.
- **Alternative URLs kept minimal:** only singular `case-study` and the legacy TripTogether slug (named in the owner's review notes). Case-insensitive and unknown-slug redirects were not added: redirecting unknown slugs to the list would hide genuine 404s from search engines.

## F. Verification

| Check | Command | Result |
| --- | --- | --- |
| Typecheck, lint | `npm run typecheck`, `npm run lint` | pass |
| Tests | `npm test` | pass: 5 node tests (1 new), 5 Python tests |
| Redirects | production build, `curl -H "Host: …" http://127.0.0.1:3100/case-studies/employee-lifecycle-synchronization` for `v1`–`v5` and `www` | 308 to `https://viditpujara.me/case-studies/employee-lifecycle-synchronization` for each; the canonical host returns 200; `/case-study`, `/case-study/<slug>` and `/projects/triptogether-planner` return 308 to the canonical routes |
| QA sweep | `python3 scripts/qa-sweep.py http://127.0.0.1:3100 --origin https://viditpujara.me --environment production` | PASS HTTP/content (18 routes, including the new redirect check) and 7 of 7 Playwright tests |
| In-site navigation | browser: list to detail, header, next case study, mobile menu | all navigate correctly (no defect found) |

- **Not run:** a live check (this build is not deployed); a check of `v3`/`v4` (other deployments); the preview-mode build (CI covers it).
- **Known limitations:** the redirects take effect only after the owner merges and deploys. `v3`, `v4`, `v1` and `v2` still need hosting-layer action.

## G. Handoff and review

- **Remaining work (owner):** merge and deploy; then add a permanent redirect to `viditpujara.me` for `v3` and `v4` in their own Vercel projects (or remove those domains) and decide what to do with `v1` and `v2`.
- **Open question for the owner:** if "not redirecting" meant a specific URL or behaviour other than old-version hosts, send the exact URL and what you expected.
- **Known risks:** a host-based rule could redirect a legitimate visitor only if a preview deployment is served on one of those host names, which is not expected.
- **Rollback:** revert the merge commit.
- **Reviewer instructions:** read `next.config.ts`; after deploy run `curl -sI https://v5.viditpujara.me/case-studies/employee-lifecycle-synchronization` and expect a 308 to the canonical URL.
- **Recommended review decision:** Ready for human review. This is a recommendation, not an approval.
