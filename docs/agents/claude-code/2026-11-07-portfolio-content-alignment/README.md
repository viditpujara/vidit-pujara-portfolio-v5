---
task-id: 2026-11-07-portfolio-content-alignment
agent: claude-code
platform: Claude Code desktop app (Code tab)
model: Claude Sonnet 5.5 (claude-sonnet-5-5), as stated by the session
rules-version: 1
description: Align the public résumé PDF and site copy with the owner's review documents
started: 2026-11-07
requirements: none imported yet; the plan's local R-IDs are mapped in section G
branch: agent/claude-code/2026-11-07-portfolio-content-alignment
status: ready-for-review
commits: see `git log agent/claude-code/2026-11-07-portfolio-content-alignment`
pr: https://github.com/viditpujara/vidit-pujara-portfolio-v5/pull/3
continues:
depends-on: 2026-11-07-repository-governance
---

# Portfolio content alignment

## A. Task summary

- **Requested:** implement the plan prepared at the start of the session, based on the eight review documents the owner keeps locally (not committed; the repository is public).
- **Why:** most recommendations were already merged in PR #1. What remained was résumé and web-copy drift, a few hedged or ownership-implying phrases, mixed career-direction wording, and a résumé build that could not run on macOS.
- **Expected outcome:** the PDF summary and skills match the review documents' patch, the web résumé summary uses the same key phrases, "designed" wording is gone, the direction narrative is neutral, metadata descriptions are ≤155 characters, and a test guards against drift.
- **Scope / exclusions:** no layout or styling changes, no new claims or keywords, no account-side work (Search Console, redirects for v1–v5, key rotation, LinkedIn, GitHub), no phone number.

## B. Initial analysis

- Baseline on this checkout before any edit: `npm run typecheck`, `npm run lint` and `npm test` (4 node and 5 Python tests) all passed.
- Live site on 2026-11-07 already served the PR #1 build (indexable, 18-URL sitemap, PDF, "Consultant I").
- `scripts/build-resume.py` hard-coded a Linux font path; the system Python here is 3.9 but the pinned `reportlab==5.1.0` needs 3.10+.
- Relevant files: `docs/resume.json`, `scripts/build-resume.py`, `scripts/verify-resume.py`, `src/content/{site,pages,metrics,case-studies,figures}.ts`, `tests/environment.test.mjs`.
- Overlap check: the only other open work is PR #2 (governance). This branch is stacked on it (`depends-on`).

## C. Implementation plan

- **Plan:** the session's plan (phases 0–4 implemented; phase 5 external and phase 6 evidence-gated not implemented).
- **Owner approval:** the owner told the agent in chat to implement the plan, without answering its four open questions. The agent had stated beforehand that it would use these defaults, and applied them: (Q1) "20+" and "10+" in the PDF only, site ranges kept; (Q2) neutral direction wording; (Q3) phone stays out of the public PDF and site; (Q4) GitHub links kept on the site.
- **Owner answers, later the same day:** Q1 "follow the PDF" (the site now also says "20+" and "10+"); Q2 and Q4 "keep as it is" (neutral direction wording and the GitHub links stay); Q3 was answered "yes", but the question could be read either way (show the phone number, or keep it out), so the phone number stays out until the owner clarifies; concurrent support is "2 to 3" client environments depending on the client; add specifics for the second implementation project (details not yet supplied, so nothing was added); add a few more OIC keywords (which ones not yet specified, so nothing was added).
- **Acceptance criteria:** PDF is two pages and passes `verify-resume.py`; typecheck, lint, tests, production build and the QA sweep pass; no stale "designed" or "AI Integration Architecture" wording remains in `src/`.

## D. Implementation record

- **Modified**
  - `docs/resume.json`: new summary (counts, toolchain, load-error mapping, APEX sentence); "Also" skills line with APEX (certified) and Java; "20+", "10+", "~" in place of "approximately"/"about"; `keywords` field.
  - `public/vidit-pujara-oracle-fusion-technical-consultant-resume.pdf`: regenerated.
  - `scripts/build-resume.py`: `RESUME_FONT_DIR` override, PDF keywords metadata.
  - `scripts/verify-resume.py`: asserts the new phrases and the keywords metadata; normalises whitespace before matching.
  - `src/content/site.ts`: `identity.positioning` shortened to 154 characters (used for the fallback description and JSON-LD) and no longer mentions AI architecture.
  - `src/content/pages.ts`: hero sentence per the review documents; "Designed…" removed from experience; duplicate "multiple client environments" bullet removed; "Oracle ERP" replaced by "Oracle Fusion" in the contact copy; direction heading, intro, about narrative and skills band text made neutral; web résumé summary aligned with the PDF.
  - `src/content/metrics.ts`, `src/content/case-studies.ts`: "designed" removed.
  - `src/content/figures.ts`: direction stage and its text alternative made neutral.
  - `src/app/{about,contact,resume}/page.tsx`: keyword arrays use "Oracle Fusion".
  - `tests/environment.test.mjs`: two new tests (shared summary phrases; description length ≤155).
- **Follow-up instructions from the owner, same day** ("install latest python", "add OIC keywords", "clean up", "do whatever needs to be done"), applied to this task:
  - Installed Python 3.15.2 (latest stable offered by `uv`; 3.16 is alpha) for the user, without admin rights, under `~/.local/share/uv/python`. It is not the system default. The PDF was rebuilt with it and the pinned `scripts/requirements.txt`.
  - Added OIC keywords: `docs/resume.json` (Integration line), `src/content/pages.ts` (skills band and web résumé skills), `scripts/verify-resume.py` (asserts three of them), and recorded the change and its evidence level in `CONTENT_VERIFICATION.md`.
  - `README.md`: notes that the pinned `reportlab` needs Python 3.10+ and documents `RESUME_FONT_DIR`.
  - Cleaned up build outputs and temporary files created during the work (see section F).
  - After the owner's answers (see section C): `src/content/metrics.ts` and `src/content/pages.ts` now say "20+" and "10+" (home and experience metrics, the delivery-scope graph, the about narrative and the web résumé summary); the delivery-scope graph rows became value rows with lower-bound captions; `src/app/experience/page.tsx` graph intro rewritten; the concurrent support statement says "2 to 3 client environments, depending on the client" in `docs/resume.json`, `pages.ts` and `metrics.ts`; `scripts/verify-resume.py` checks the new client wording; the PDF was rebuilt; `CONTENT_VERIFICATION.md` records both answers.
  - Not done, because they need account access or explicit authorization under `AGENTS.md`: Search Console, v1–v5 redirects, TripTogether key rotation, LinkedIn and GitHub profile changes, merging, and the requirements import (a separate task needing the owner's approval of sanitised summaries).
- **Created:** this record and its index line. **Removed:** none.
- **Behavioural changes:** copy and PDF content only. No layout, routing or configuration change.
- **Deviations:** the keywords step was not in the original plan (it was evidence-gated) and was added on the owner's instruction. Site metric ranges ("20 to 25", "10 to 15") are deliberately unchanged (Q1 default).

## E. Technical decisions

- **"20+" and "10+" on both PDF and site:** chosen by the owner. They are lower bounds consistent with the earlier 20–25 and 10–15 figures. The delivery-scope graph now draws solid bars to 20 and 10 with a caption saying they are lower bounds; no range rows remain in the graphs (the 15 to 20 team size is still a text range).
- **Neutral direction wording:** replaces the "AI Integration Architecture by 2028" career-title framing with the review documents' neutral line about solution design, VBCS and AI enabled automation. The "By 2028" timeline stage label stays because it is the owner's timeline.
- **Rebuilding on macOS:** the PDF was first rebuilt with `reportlab` 4.5.1 on the system Python 3.9; a rebuild of the unchanged `resume.json` reproduced the committed PDF's page text exactly. After Python 3.15.2 was installed, the final PDF was rebuilt with the pinned `reportlab==5.1.0`, `pypdf==6.21.4` and `Pillow==13.0.0` from `scripts/requirements.txt`, in a throwaway virtual environment outside the repository, with DejaVu fonts taken from the `matplotlib` wheel. The version caveat no longer applies.
- **OIC keywords:** added because the owner instructed it, not because the repository proves each one. See `CONTENT_VERIFICATION.md`. OTBI, HCM Extracts, Fast Formula and HSDL were not added.

## F. Verification

| Check | Command | Result |
| --- | --- | --- |
| Baseline | `npm run typecheck`, `npm run lint`, `npm test` before edits | pass (4 node, 5 Python tests) |
| Typecheck | `npm run typecheck` | pass |
| Lint | `npm run lint` | pass |
| Tests | `npm test` | pass: 6 node tests (2 new), 5 Python tests |
| PDF verify | `scripts/verify-resume.py` (venv) | PASS: two pages, reviewed facts, three allowed links, no phone or forms, title and keywords metadata |
| PDF render | pages rendered to PNG with PyMuPDF and inspected | two pages, no clipping or overlap, "~" renders correctly |
| Production build | `NEXT_PUBLIC_SITE_URL=https://viditpujara.me NEXT_PUBLIC_SITE_ENV=production npm run build` | pass, 18 routes |
| QA sweep | `python3 scripts/qa-sweep.py http://127.0.0.1:3100 --origin https://viditpujara.me --environment production` | PASS HTTP/content (18 routes) and 7 of 7 Playwright tests (390/768/1440 px, dialog, download, reduced motion, no-JS) |
| Visual | home page viewed at desktop width in the in-app browser | new hero sentence and direction heading render correctly |
| After follow-up (keywords, Python 3.15.2) | typecheck, lint, `npm test`, Python tests on 3.15.2, production build, QA sweep, `verify-resume.py` | all pass: 6 node tests, 5 Python tests, 18 routes and 7 of 7 Playwright tests; PDF still two pages; page 1 re-rendered and inspected |
| After the owner's answers (20+/10+ on the site, 2 to 3 clients) | typecheck, lint, `npm test`, Python tests on 3.15.2, production build, QA sweep, `verify-resume.py` | all pass: 6 node tests, 5 Python tests, 18 routes, 7 of 7 Playwright tests; PDF page 1 re-rendered and inspected; experience-page graphs viewed in the in-app browser (bars and captions render correctly) |
| CI on PR #3 before the follow-up | PR checks | 8 of 8 passing (read from the PR; the follow-up commit will run again) |

- **Not run:** preview-mode build and QA (the PR's CI covers it); a visual pass of every changed page at 390 and 768 px beyond the automated overflow checks; `npm run security:scan` (no dependency or credential changes).
- **Known limitations:** page 2 of the regenerated PDF was not re-inspected after the follow-up (its content did not change; `verify-resume.py` passes).
- **Clean-up:** removed the generated `.next/`, `output/`, `test-results/` and `tsconfig.tsbuildinfo`, and the temporary virtual environments, screenshots, logs and baseline PDF in the session scratch folder. `node_modules/` and the Playwright browser were kept; they are ignored by Git and needed for development.

## G. Handoff and review

- **Traceability (plan R-IDs; sources are the owner's local review documents, referenced by file name only):**

| Plan ID | Source (local) | Outcome | Files |
| --- | --- | --- | --- |
| R07 hero sentence | `market_fit_and_title_analysis.md` §9 | done | `pages.ts` |
| R08 descriptions ≤155 | same | done, tested | `site.ts`, new test |
| R10 duplicate bullet | `portfolio_cross_validation.md` §6 | done | `pages.ts` |
| R14 direction narrative | `portfolio_cross_validation.md` §7.9, `product_management_fit.md` §4.5 | done with the neutral wording (Q2 default) | `pages.ts`, `figures.ts`, `site.ts` |
| R17 "20+/10+" | `final_resume_improvement_patch.md` §2 | PDF and site (owner's answer to Q1) | `resume.json`, `metrics.ts`, `pages.ts` |
| R18 "designed" | `word_by_word_resume_review.md` S2, E1 | done | `metrics.ts`, `pages.ts`, `case-studies.ts` |
| R20 phone | `final_resume_improvement_patch.md` §1 | intentionally not applied (Q3 default; privacy policy) | none |
| R21–R23 summary and skills | `final_resume_improvement_patch.md` §2–3 | done in PDF and web summary | `resume.json`, `pages.ts` |
| R32 PDF keywords | `ats_and_keyword_report.md` §7.10 | done | `build-resume.py`, `resume.json` |
| R41 "Oracle ERP" | `market_fit_and_title_analysis.md` §3 | done in contact copy and keyword arrays | `pages.ts`, three page files |

- **Deferred or blocked:** second-project specifics (module, number of integrations and reports, integration pattern) and the choice of further OIC keywords are waiting for the owner's details; Q3 (phone number) is waiting for clarification and stays out meanwhile; OTBI, HCM Extracts and Fast Formula stay out until evidenced (the other OIC keywords are now in, on the owner's instruction); account-side items (Search Console, v1–v5 redirects, TripTogether key rotation, LinkedIn and GitHub profile cleanup); Q4 (GitHub links) remains at its default.
- **Known risks:** copy decisions rest on the stated defaults; the owner may want Q1–Q4 settled differently. The added OIC keywords are claims on a public résumé: lookups, WSDL, UCM and XSLT/XPath mapping have no specific support in the repository, so the owner should be able to explain each in an interview.
- **Rollback:** revert the merge commit; restoring `docs/resume.json` and re-running the build restores the previous PDF text.
- **Reviewer instructions:** read the PDF (`public/…resume.pdf`) and the home, about and experience pages; check the diff of `src/content/` for wording you disagree with; confirm the defaults in section C.
- **Recommended review decision:** Ready for human review. This is a recommendation, not an approval.
