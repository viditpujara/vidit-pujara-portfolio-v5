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
- **Created:** this record and its index line. **Removed:** none.
- **Behavioural changes:** copy and PDF content only. No layout, routing or configuration change.
- **Deviations:** none from the plan. Site metric ranges ("20 to 25", "10 to 15") are deliberately unchanged (Q1 default).

## E. Technical decisions

- **PDF "20+" versus site "20 to 25":** "20+" is true under the range, so the two surfaces agree in substance while the PDF reads less hedged. Changing the site would require reworking the range graphs.
- **Neutral direction wording:** replaces the "AI Integration Architecture by 2028" career-title framing with the review documents' neutral line about solution design, VBCS and AI enabled automation. The "By 2028" timeline stage label stays because it is the owner's timeline.
- **Rebuilding on macOS:** the PDF was rebuilt with `reportlab` 4.5.1 (the pinned 5.1.0 needs Python 3.10+) and DejaVu fonts taken from the `matplotlib` wheel, in a throwaway virtual environment outside the repository. A rebuild of the unchanged `resume.json` first reproduced the committed PDF's page text exactly (2 pages, identical text). CI uses its own Python and the pinned version, so the PDF there may differ in bytes but not in text.

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

- **Not run:** preview-mode build and QA (the PR's CI covers it); a visual pass of every changed page at 390 and 768 px beyond the automated overflow checks; `npm run security:scan` (no dependency or credential changes).
- **Known limitations:** the PDF was produced with a different `reportlab` version than CI pins. The text-level checks pass, but byte-identical output is not claimed.

## G. Handoff and review

- **Traceability (plan R-IDs; sources are the owner's local review documents, referenced by file name only):**

| Plan ID | Source (local) | Outcome | Files |
| --- | --- | --- | --- |
| R07 hero sentence | `market_fit_and_title_analysis.md` §9 | done | `pages.ts` |
| R08 descriptions ≤155 | same | done, tested | `site.ts`, new test |
| R10 duplicate bullet | `portfolio_cross_validation.md` §6 | done | `pages.ts` |
| R14 direction narrative | `portfolio_cross_validation.md` §7.9, `product_management_fit.md` §4.5 | done with the neutral wording (Q2 default) | `pages.ts`, `figures.ts`, `site.ts` |
| R17 "20+/10+" | `final_resume_improvement_patch.md` §2 | PDF only (Q1 default) | `resume.json` |
| R18 "designed" | `word_by_word_resume_review.md` S2, E1 | done | `metrics.ts`, `pages.ts`, `case-studies.ts` |
| R20 phone | `final_resume_improvement_patch.md` §1 | intentionally not applied (Q3 default; privacy policy) | none |
| R21–R23 summary and skills | `final_resume_improvement_patch.md` §2–3 | done in PDF and web summary | `resume.json`, `pages.ts` |
| R32 PDF keywords | `ats_and_keyword_report.md` §7.10 | done | `build-resume.py`, `resume.json` |
| R41 "Oracle ERP" | `market_fit_and_title_analysis.md` §3 | done in contact copy and keyword arrays | `pages.ts`, three page files |

- **Deferred or blocked:** OIC keywords (OTBI, XSLT/XPath and others) and the concurrent-client count need the owner's confirmation; second-project specifics; account-side items (Search Console, v1–v5 redirects, TripTogether key rotation, LinkedIn and GitHub profile cleanup); Q4 (GitHub links) remains at its default.
- **Known risks:** copy decisions rest on the stated defaults; the owner may want Q1–Q4 settled differently.
- **Rollback:** revert the merge commit; restoring `docs/resume.json` and re-running the build restores the previous PDF text.
- **Reviewer instructions:** read the PDF (`public/…resume.pdf`) and the home, about and experience pages; check the diff of `src/content/` for wording you disagree with; confirm the defaults in section C.
- **Recommended review decision:** Ready for human review. This is a recommendation, not an approval.
