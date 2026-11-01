# Portfolio audit and implementation plan

Reviewed: 1 November 2026 (Asia/Kolkata). Updated the same day after inspecting the newly supplied résumé PDF. Source baseline: `24f1abc` on `main`.

Local implementation completed on 1 November 2026. See [implementation status](docs/audit/IMPLEMENTATION_STATUS.md) for completed changes, verification and remaining account-side actions. The detailed findings and sequence below preserve the pre-implementation review; their original “pending” statements are historical unless repeated in the current status.

Implemented: patched framework/dependencies, separate Consultant I/public Fusion title, support copy/chart corrections, corrected downloadable résumé, link containment, environment validation, response headers, accessible navigation, privacy fixtures and release checks. No production deployment, provider credential change or remote history rewrite has been performed. Production dependency audit is clean; 16 moderate development-tool findings remain open.


The user confirmed the current official designation during this review: **Consultant I**. The proposed public headline is **Oracle Fusion Technical Consultant**, with **Oracle Integration Cloud (OIC)** as the specialism. These are separate fields with separate purposes. Do not substitute “Technical Consultant I” for the confirmed HR title.

Use `https://viditpujara.me` as the proposed canonical origin because it is the existing public portfolio domain and the domain used by the supplied recommendations. The exact number of concurrent support environments is still unconfirmed; publish “multiple client environments” until a count is verified.

## Evidence and limits

All eight files in `/home/vidit/Downloads/files` were read:

| Input | Recommendations incorporated |
| --- | --- |
| `final_recommendations.md` | Five urgent portfolio fixes, V2 résumé, title alignment, archive strategy and professional profile cleanup |
| `portfolio_cross_validation.md` | Support-scope discrepancies, subdomain behavior, PDF download, skills and GitHub cleanup |
| `final_resume_improvement_patch.md` | Proposed title, support bullets, case-study summaries and résumé structure |
| `market_fit_and_title_analysis.md` | Fusion/OIC headline and distinction between public positioning and HR designation |
| `ats_and_keyword_report.md` | Visible URLs, selectable PDF text, employer attribution, certifications and evidence-gated keywords |
| `word_by_word_resume_review.md` | Assigned-module scope, error-to-source mapping, outcome language and unsupported second-project claims |
| `resume_version_comparison.md` | Use the anonymized V2 as the base; do not publish the client-named V1 |
| `product_management_fit.md` | Keep the current positioning grounded in technical delivery; product titles require additional evidence |

The folder now contains the eight Markdown reports plus `Vidit_Pujara_Oracle_Fusion_Technical_Consultant_OIC.pdf`, supplied after the initial audit. The new PDF was inspected directly using Poppler metadata, font, URL and text extraction tools; both pages were rendered to PNG and visually reviewed. No editable résumé source or HR document is present. Findings about the earlier V1/V2 PDFs remain attributed to the reports; do not assume the new file is byte-identical to either historical version.

### Supplied résumé PDF review

Source: `/home/vidit/Downloads/files/Vidit_Pujara_Oracle_Fusion_Technical_Consultant_OIC.pdf`.

SHA-256: `40c65e42c4077422f1fd490bd737236e5a51ab18fa170eebb0df5a610fe0556d`.

| Check | Direct observation | Implementation consequence |
| --- | --- | --- |
| File/layout | 53,993 bytes; two A4 pages; single-column layout; no visible clipping, overlap or blank page in the rendered review | Retain the layout; re-render after content edits, especially adding certifications |
| Text/fonts | Selectable text extracts in reading order; all four fonts embedded/subset with Unicode maps | Preserve these properties in the final public copy |
| Header/metadata | Header is Oracle Fusion Technical Consultant with OIC specialism; PDF title and author match the proposed positioning | Already aligned; do not redo the header/metadata unnecessarily |
| Formal employment title | Page 1 still says Oracle ERP Technical Consultant at Mastek | Replace the role title with **Consultant I**, matching the user's current confirmation |
| Support | Concurrent UK/Finland OIC support and separate UK local-government ADF support already sit under Mastek | Use this as the supplied evidence for site alignment; retain “multiple” rather than inventing a client count. Country/sector detail is optional and can be generalized for the public copy |
| Metrics/scope | Approximate 20–25 integrations, 10–15 BIP reports, three implementations and assigned-module ownership | Supports retaining the site's approximate ranges; no count for concurrent support environments is supplied |
| Contact/links | Visible portfolio/LinkedIn URLs with matching HTTPS annotations; email link; no GitHub link; phone appears in visible text and a `tel:` annotation | Preserve useful URLs; remove phone text **and** its annotation from the public copy under the existing privacy policy |
| Structure | Support merged under Mastek; enterprise projects attributed to Mastek; no repeated contact header on page 2 | These recommendations are already satisfied |
| Certifications | No certification section; Oracle APEX credential absent from the PDF | Add Oracle APEX Professional and relevant Microsoft certifications already documented on the website |
| Second project | Energy-infrastructure implementation still has a generic integration/reporting bullet without module, count or distinctive pattern | Supply defensible details or remove the separate block; the three-implementation experience bullet can remain |
| Confidentiality | No explicit client organization names observed; some country/sector descriptors remain | Keep anonymized copy and review descriptor specificity; do not claim anonymity proves NDA compliance |
| PDF features | Not encrypted; no forms or JavaScript reported by `pdfinfo`; not tagged | No password barrier to download/read; tagged-PDF accessibility is a follow-up improvement, not a claimed pass |

Status: **PDF received and reviewed; content/privacy corrections required before publishing this exact file.** The receipt blocker is closed. The public-ready artifact remains pending. The original PDF has not been edited or copied into `public/`.

Reviewed local configuration, content, SEO, navigation, résumé rendering, security-sensitive code paths, lockfile, QA script and project/security notes. A limited credential-pattern scan examined all 3 commits reachable in this clone and 67 unique blobs. It found no matches for the selected Google API key, Supabase secret key, GitHub token, private-key and JWT patterns. This is not an exhaustive secret scan and says nothing about TripTogether's separate history.

Public HTTP reads independently verified the live behavior below. The exact deployed commit and Vercel environment values are not visible from HTTP responses. No authenticated Vercel, Google, Supabase, Search Console, LinkedIn or GitHub account settings were inspected. No exploitation, credential testing, dependency installation or application build was performed for this planning task.

## Live deployment findings

| URL checked | Observed on 1 November 2026 |
| --- | --- |
| `https://viditpujara.me/` | HTTP 200; title still says Oracle ERP Technical Consultant; robots meta is `noindex, nofollow`; canonical points to `https://viditpujara-v5.vercel.app` |
| `https://viditpujara.me/robots.txt` | HTTP 200; `User-Agent: *` and `Disallow: /` |
| `https://viditpujara.me/sitemap.xml` | HTTP 200; 18 URLs, all on `viditpujara-v5.vercel.app` |
| `https://v1.viditpujara.me/` and `https://v2.viditpujara.me/` | HTTP 404 |
| `https://v3.viditpujara.me/robots.txt`, v4 and v5 equivalents | HTTP 200; all disallow crawling |
| Main HTML response headers | HSTS present (`max-age=63072000`); CSP, CSP Report-Only, X-Frame-Options, X-Content-Type-Options, Referrer-Policy and Permissions-Policy absent on the sampled response |

The live indexing and canonical problems are confirmed. The precise cause is inferred from `src/content/site.ts:1`: indexing requires an exact production flag, while the origin falls back to Vercel host variables. Changing environment values requires a fresh build/deployment; setting them only when starting a previously built server is insufficient for pre-rendered output.

## Prioritized findings

P0 means immediate containment or a release blocker. P1 means the next implementation release. P2 means follow-up improvement. Content and SEO priorities are not security severity ratings.

| ID / priority | Finding and evidence | Impact / classification | Planned treatment |
| --- | --- | --- | --- |
| DEP-01 / P0 | Approved npm lockfile audit reports 22 affected package entries, including critical `next@16.3.0` and high `sharp@0.35.3` | Confirmed vulnerable dependency versions; live reachability/exploitability not established | Upgrade Next.js and its lint config together, refresh the lockfile including sharp, resolve other advisories and rebuild before wider publication |
| SEC-01 / P0 | TripTogether credentials are reported in separate-repository history by `REMAINING_MANUAL_ACTIONS.md:7`, `PRIVACY_REVIEW.md` and `src/content/projects.ts:270`; its public repo link is at `src/content/projects.ts:220` | Potentially high security impact; current key validity/type/rotation status unverified | Temporarily suppress the direct repo link; revoke exposed secrets, verify database policies and client bundles, then clean history and restore only after verification |
| SEO-01 / P0 | Main site is noindex/disallowed and publishes Vercel-host canonicals/sitemap | Confirmed discoverability and identity defect | Correct Production build variables, rebuild, verify exact public origin and indexing behavior |
| CNT-01 / P1 | `identity.officialDesignation` is wrong and unused by rendering; designation/title strings are duplicated in `src/content/pages.ts`, page metadata and assets | Confirmed inconsistency with the user's current HR title | Set official designation to Consultant I; use public headline separately and derive repeated facts from shared content |
| CNT-02 / P1 | `pages.ts` and `metrics.ts` retain “two additional projects”; `graphCoverage` repeats the count and unit | Stale or ambiguous scope; project counts are not interchangeable with concurrent client environments | Add OIC production-support and ADF support under Mastek; remove obsolete numeric claim until verified; update chart, summary and résumé together |
| CNT-03 / P1 | New PDF received and reviewed in Downloads, but no PDF exists in `public/`; `/resume` only prints the webpage; supplied file has an outdated employment title, a phone number and no certifications | Missing download plus specific publication-readiness gaps | Correct the supplied PDF, re-verify it, publish the reviewed copy and add a download alongside Print |
| SEC-02 / P1 | `scripts/qa-sweep.py:63` onward embeds actual client/vendor identifiers and a personal phone number in a public repository, despite privacy notes saying these are not published | Confirmed source-level confidentiality/privacy exposure; they are not currently rendered by the site | Move sensitive denylist values to a private ignored input; remove public copies and assess history cleanup; retain generic public checks |
| SEC-03 / P1 | `.gitignore:8` only ignores `.env*.local`; plain `.env`, `.env.production` and similar files are not covered | Medium preventive security gap; not evidence of a current v5 key leak | Ignore `.env` and `.env.*`, explicitly allow `.env.example`; add secret scanning |
| SEC-04 / P1 | `next.config.ts` defines no security headers; sampled live HTML lacks the headers listed above | Defense-in-depth gap; no demonstrated XSS or clickjacking exploit | Add compatible headers and stage CSP carefully; retain existing HSTS |
| QA-01 / P1 | `scripts/qa-sweep.py:230` treats disallow-all robots as a note; line 239 repeats a constant substring check instead of checking each route; canonicals need only start with HTTPS | Confirmed false-pass paths, directly relevant to the live SEO failure | Add expected-origin/environment arguments, exact XML URL-set comparisons and per-route canonical/meta assertions |
| QA-02 / P1 | Missing Playwright is merely a note at `scripts/qa-sweep.py:250`; final output still says all checks clean; no tracked CI workflow enforces checks | Incomplete coverage can look like a full release pass | Make required browser coverage explicit and fail release mode if unavailable; add CI checks and honest results |
| A11Y-01 / P1 | Mobile navigation declares `aria-modal=true` but has no focus containment/background inertness; state does not observe route or breakpoint changes (`SiteHeader.tsx:20–49,136`) | Confirmed implementation gaps; browser impact needs reproduction | Use an accessible modal implementation; restore focus, close on navigation/desktop transition and release scroll lock |
| SEO-02 / P1 | v1/v2 return 404; multiple historical hosts remain public | Broken recruiter links and divergent professional records | Redirect historical hosts to the canonical site, preserving valid paths; never redirect the canonical host to itself |
| CNT-04 / P2 | Sherbimet copy claims prepared queries at `projects.ts:85` but later describes escaped-string SQL interpolation | Confirmed contradiction in portfolio copy; separate project's SQL-injection susceptibility is not verified here | Correct the description and track a separate source audit before making security claims |
| CNT-05 / P2 | PL/SQL is used in case studies but omitted from the main data skills lists; ADF is grouped only as trained/working knowledge | Presentation understates demonstrated skills or conflicts with support wording | Add evidence-backed PL/SQL; distinguish ADF application support from ADF development |
| SEO-03 / P2 | Long descriptions, manually duplicated route lists, build-time `new Date()` for every sitemap entry | Search presentation and maintenance defects | Write concise descriptions; derive/check route inventory; use meaningful modification dates or omit them |

### Dependency advisory results

The user approved sending package names/versions to npm's advisory endpoint. The read-only `npm audit --package-lock-only --ignore-scripts --json` completed successfully on 1 November 2026. It reported **22 affected package entries: 1 critical, 5 high and 16 moderate**. Counts include transitive propagation; they are not 22 independent exploits. The raw result is preserved at [docs/audit/npm-audit-2026-11-01.json](docs/audit/npm-audit-2026-11-01.json).

| Package / locked version | Audit status and proposed action |
| --- | --- |
| `next@16.3.0` | Critical, direct production dependency. Multiple advisories apply by version, including image optimization RCE. The audit proposes `16.4.3`; upgrade to a verified patched compatible stable version, align `eslint-config-next`, regenerate the lockfile and rerun checks. Do not stop at `16.3.3`, which does not cover the later advisories. |
| `sharp@0.35.3` | High, optional non-dev dependency used by Next image processing. Ensure the resolved version is at least `0.35.5` and satisfies all current advisories, including the bundled native-library version. |
| `source-map-js@1.2.1` | High, non-dev lockfile entry; update to at least `1.2.2`. Determine whether untrusted source maps can reach it in the deployed runtime rather than equating lockfile classification with exploitability. |
| `brace-expansion@1.1.18` and nested `5.0.9` | High, dev dependency copies. Refresh compatible dependency chains to patched releases (`1.1.21` / `5.0.12` or later compatible fixes). |
| `js-yaml@4.3.1` | High, dev dependency. Refresh to `4.3.2` or a verified patched compatible version. |
| `zod@4.4.3` | High, dev dependency. Refresh the owning dependency chain to resolve `4.6.6` or a verified patched compatible version. |
| `minimatch@3.1.5` and nested `10.2.6`, plus ESLint/TypeScript-ESLint chain | Moderate. Current advisory marks versions below `11.0.1` affected. Prefer maintainer-compatible upgrades. A major-version override needs API/engine compatibility review; if no safe fix exists, record reachability and a bounded exception with a recheck date. |

Primary advisories reviewed: [Next AVIF optimization](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4), [Next SVG optimization](https://github.com/vercel/next.js/security/advisories/GHSA-2464-fhr4-w9xw), [sharp native-library vulnerability](https://github.com/lovell/sharp/security/advisories/GHSA-wq5f-xc86-pv6w). The image advisories have platform/runtime preconditions. This site uses `next/image` and enables AVIF output, but those facts alone do not prove malicious input can reach a vulnerable decoder on the hosted deployment. No exploitation was attempted. Other Next advisory features, such as dynamic OG image generation and `use cache`, are not evidenced in this source; still update the framework rather than relying on feature avoidance.

The audit's automatic fixes suggest downgrading ESLint to 4.0.0 and `eslint-config-next` to 12.0.4 for some transitive findings. **Do not apply those suggestions**: they conflict with this Next 16 / ESLint flat-config project. Use compatible chain upgrades and document any unresolved development-tool advisory honestly.

## Implementation sequence

### 0. Patch the vulnerable dependency baseline

Owner: portfolio maintainer. Files: `package.json`, `package-lock.json`, runtime/CI configuration if needed.

1. Review the recorded advisories and move Next.js from `16.3.0` to a compatible patched release (audit candidate `16.4.3`), keeping `eslint-config-next` aligned. Check release notes and Node requirements before updating.
2. Regenerate and inspect the lockfile; verify the actual resolved `sharp`/native packages and other affected packages. Resolve high findings with compatible updates rather than blind forced downgrades or unreviewed major overrides.
3. Run clean installation, typecheck, lint and the production build, then the served-site checks including local image optimization, all project/case-study routes and security/SEO output. Verify the preview build as well.
4. Rerun the advisory check against the final lockfile and record remaining findings, runtime reachability and any explicitly justified exception. Confirm the deployed release actually uses the reviewed lockfile/build.

Acceptance: critical runtime advisories addressed; high findings fixed or individually assessed; no incompatible lint downgrade; clean build and smoke checks. Deploy this security update before, or together with, the indexing repair. Do not delay actual credential revocation while doing it.

### 1. Contain linked-repository risk

Owner: repository/provider owner for secrets and remote history; portfolio maintainer for link suppression. This can start before the content refresh.

1. Temporarily remove TripTogether's direct external repository action from the portfolio. Keep its internal project page if useful. Make the repository-action rendering tolerate an empty list, and verify no direct URL survives in HTML, JSON-LD or a newly generated PDF. Do not add a disabled or broken button.
2. Review provider records without printing keys or adding them to issues/reports. Identify whether the Supabase value is an intended public `anon`/publishable key or an elevated `service_role`/secret key. Public key exposure alone is not a secret leak; security depends on authentication, grants and Row Level Security (RLS). Rotate/revoke actual exposed secrets promptly, including Gemini, and check usage/billing for abuse.
3. Keep Gemini credentials in a server/Edge Function, outside browser bundles and `VITE_*`/`NEXT_PUBLIC_*`. Authenticate and authorize callers, validate inputs and apply rate/usage limits before re-enabling the feature. Rotating a key into the same client bundle would repeat the exposure.
4. Test database/storage policies: unauthenticated access denied where appropriate; one participant cannot access another trip; administrator privileges enforced by the backend. Client route guards are not proof of data authorization. Do not claim these controls exist based on the current portfolio description.
5. After revocation, freeze writes to the affected repo, create a restricted backup, rewrite affected paths/values across relevant branches and tags in a fresh clone, coordinate the force-push and collaborator re-clones, and rescan. Include caches, PR references, releases and old build artifacts in the cleanup assessment. Never include literal secrets in command arguments or logs.
6. Restore the external portfolio link only after revocation and cleanup are evidenced. Making a repository private or removing a link is containment, not revocation; existing clones and forks may retain the values.

Acceptance: no active exposed secret; replacement is absent from browser assets; RLS/authorization checks pass; history scan is recorded without values; the portfolio contains no unsafe external link while remediation remains open.

Provider guidance: [Supabase API key types](https://supabase.com/docs/guides/getting-started/api-keys), [Gemini API keys](https://ai.google.dev/gemini-api/docs/api-key), [GitHub sensitive-data removal](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository).

### 2. Repair production identity and indexing

Files: `.env.example`, `src/content/site.ts`, `src/lib/seo.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`, `DOMAIN_AND_SEARCH_SETUP.md`, `README.md`, QA script. External configuration: Vercel Production environment and domain redirects.

1. On the deployment actually serving `viditpujara.me`, set `NEXT_PUBLIC_SITE_URL=https://viditpujara.me` and `NEXT_PUBLIC_SITE_ENV=production` for the Production build. Leave Preview/Development non-production. Do not use `NODE_ENV=production` as the indexing decision: preview builds use production compilation too.
2. Validate the canonical configuration at build time. Production must have an explicit HTTPS origin with no credentials, query, fragment or non-root path. Reject localhost/preview hosts and reject a missing origin rather than silently falling back. Normalize with `URL`; preserve a known canonical production origin in preview metadata where configured, while keeping previews noindex.
3. Prevent a Preview deployment from becoming indexable accidentally through copied environment configuration. On Vercel, cross-check the hosting deployment context; retain an explicit supported configuration for local production QA and other hosts.
4. Replace the obsolete `.qd.je` example domain. Make the default example safe for local/preview usage, with separate instructions for Production variables. Do not store credentials in this file.
5. Build again with these values, then deploy. Validate server-rendered HTML, Open Graph URLs, schema IDs, robots and sitemap after deployment.
6. Configure permanent redirects for historical subdomains and the alternate `www` host, preserving existing valid paths. Choose either archived noindex sites with clear banners or redirects; redirects are the recommended default. Keep preview build hosts noindex and avoid redirect loops.
7. Verify Search Console ownership, submit the corrected sitemap and inspect the canonical after launch. A correct deployment permits indexing; it does not guarantee Google will index it immediately.

Acceptance: all 18 current public routes return 200 on the canonical origin; unknown routes return 404; every production canonical/OG/schema URL uses `.me`; sitemap URL set matches routes exactly; production robots allows crawling and names the `.me` sitemap; HTML and response headers contain no indexing prohibition. Preview builds remain noindex/disallowed. Redirects resolve in one intended permanent hop without loops.

### 3. Align designation, support scope and professional narrative

Files: `src/content/site.ts`, `pages.ts`, `metrics.ts`, `case-studies.ts`, `figures.ts`, affected route metadata, `/resume`, social-image metadata/asset, content verification notes and design screenshots where retained.

1. Set `identity.officialDesignation` to **Consultant I**, with a dated provenance comment reflecting this conversation. Supersede the older confirmation in `CONTENT_VERIFICATION.md`; do not leave contradictory “verified” claims.
2. Set the public headline to **Oracle Fusion Technical Consultant**. Use **Oracle Integration Cloud (OIC) · Oracle Fusion HCM and Financials** as the supporting line. Proposed homepage title: **Vidit Pujara | Oracle Fusion Technical Consultant (OIC)**. Ensure the Next.js title template does not append the name twice.
3. Render **Consultant I, Mastek** on the formal experience line. State the Oracle Fusion/OIC specialism separately. Update home experience snippets, About facts/narrative, Experience, résumé and any formal structured employment description. A Person schema public `jobTitle` may use the public headline if the visible distinction is clear.
4. Centralize designation/title/period facts. Merely changing `identity.publicTitle` will not fix `home.title`, `home.experienceRole`, `experience.designation`, static metadata and narrative strings. Regenerate the OG image: its embedded old title cannot be fixed by changing alt text alone.
5. Under the existing Mastek role add: “Supported live OIC integrations for multiple client environments concurrently, investigating run logs and exception reports, identifying root causes, and coordinating correction and reprocessing.” Use the exact count only after verification.
6. Add: “Provided Oracle ADF application support for a UK local-government client alongside OIC support work.” Keep the support scope accurate; this does not establish ADF development expertise. Include no client name, identifiers, incidents containing private data or invented SLAs.
7. Reconcile all “two additional projects” instances in home, Experience, delivery metrics, `graphCoverage` rows/caption/summary and `/resume`. Do not relabel “2 projects” as “2 clients,” add ADF to an OIC count or fabricate a bar height for “multiple.” Remove the support-count bar until a comparable numeric measure is established, or replace it with a text support summary. Adjust the chart's units/axis/alt text if a count is subsequently verified.
8. Apply the supplied case-study summary and role-language improvements where existing evidence supports them. Keep the four integration narratives, source-record error mapping, reconciliation and workflow-specific outcomes. Preserve assigned-module ownership and technical-lead mentorship.
9. Prioritize Oracle/OIC, BIP, HDL, FBDI, REST/SOAP, SQL/PLSQL and production support on Skills. Keep VBCS working knowledge distinct from ADF support. Collapse older .NET/IDE/academic skills, and retain independent project stacks on their project pages.
10. Verify XSLT/XPath, adapters/connections/lookups, ESS, JSON, UCM, WSDL, OTBI, HCM Extracts, Fast Formula and other proposed keywords before adding them. Do not infer hands-on use from a typical Oracle flow. Add PL/SQL now on the basis of the already documented case studies.
11. Preserve approximate quantities and per-workflow scope. The reports' blanket switch from ranges to “20+ / 10+” conflicts with `PRIVACY_REVIEW.md`'s standing range policy. Retain the verified ranges in site charts unless the underlying source/policy is explicitly updated; use concise wording without creating exact totals or invented savings.
12. Keep current technical positioning. Do not adopt PM, PO, senior, lead or architect as a present title. A neutral near-term direction statement is a reasonable proposal, but a change in career intent needs the user's preference. Add stakeholder/requirements ownership only when supported by actual work.

Acceptance: current official designation is consistently Consultant I; public headline is distinct and consistent across visible copy, metadata, schema and OG asset; no obsolete support count remains; no placeholders or unsupported skill/outcome claims ship; the web résumé and downloadable résumé agree on facts.

### 4. Publish the cleaned V2 résumé

Files: `src/app/resume/page.tsx`, `src/content/pages.ts`, `src/content/site.ts`, `public/`, README and privacy/content notes.

The supplied reports refer to both ERP and Fusion filenames and say the README defines a path. The checked-out v5 README does **not** define an exact PDF path. `resume.printNote` points readers to instructions that are absent. Establish one contract rather than relying on the reports' conflicting paths.

Stable public path to implement: `public/vidit-pujara-oracle-fusion-technical-consultant-resume.pdf` (URL: `/vidit-pujara-oracle-fusion-technical-consultant-resume.pdf`). Download filename: `Vidit_Pujara_Oracle_Fusion_Technical_Consultant_OIC.pdf`, already matching the supplied file's name.

1. Use the newly supplied PDF as the reviewed content/layout baseline. Preserve the original in Downloads. Its editable LaTeX source was not supplied; use it if available when implementing, otherwise regenerate a corrected document from the reviewed content and reproduce its clean layout. Do not overwrite the source PDF or call a regenerated file the original historical V2.
2. Change the employment heading to **Consultant I | Mastek**, keeping Oracle Fusion/OIC in the public header and supporting wording. Add the Oracle APEX certification and relevant Microsoft credentials from the website. The current PDF already meets the recommendations for employer attribution, merged support, visible portfolio/LinkedIn URLs, removal of GitHub and absence of a repeated page-two header; preserve those improvements.
3. Retain the two-page, single-column layout, embedded fonts, selectable text, matching PDF title/author metadata and approximate ranges. Strengthen the second implementation-project bullet with verified module/pattern/count details or omit that block; do not invent them. Use the resulting space for certifications if needed.
4. Remove the visible phone number and its `tel:` annotation from the **public** copy under the site's existing no-public-phone policy, unless the user explicitly changes that policy. Remove rather than visually cover text: extraction and annotation inspection must confirm it is absent. Review country/sector descriptors for unnecessary specificity and keep client identities out. Retain only intended email/HTTPS annotations; do not include private review comments or HR documents.
5. Align website support wording with the supplied PDF's concurrent OIC support and separate ADF application support. The exact concurrent environment count is still not supplied, so use “multiple.” Keep the website's existing Certifications section and add the same verified credentials to the downloadable document; do not remove qualifications from the website to match an incomplete PDF.
6. After the corrected asset passes review, place that copy at the stable public path, add a native download anchor and retain Print/Save as PDF as a secondary action. Give the download an accessible PDF label. Document the exact source/replacement process and public path in README; remove the stale “PDF supplied later” notice and historical student-résumé rationale only when the current asset is actually published.
7. Repeat text extraction, title/author metadata, URL/annotation and font checks, then render and inspect **every page of the final corrected PDF**. The input PDF's clean rendering does not verify the edited version. Check desktop/mobile download behavior, `application/pdf`, HTTP 200, filename and absence of a stale cached copy after deployment.

Acceptance: the corrected reviewed PDF exists at the public path, downloads successfully, states Consultant I on the employment line, includes the verified certifications, contains no client names or phone text/`tel:` annotation, preserves readable selectable text and embedded fonts, agrees with the site's support/title/metric facts, and has no clipped, overlapping or empty pages. Do not publish the supplied file unchanged merely because it is now available.

### 5. Harden the portfolio repository and response headers

1. Update `.gitignore` to cover `.env`, `.env.*` and private audit inputs, with an explicit `!.env.example` exception. Verify representative filenames with `git check-ignore`; confirm the example remains tracked. An ignore rule does not remove files already tracked.
2. Remove literal private identifiers/phone values from the public QA denylist and related public notes. Load them from a private ignored file or protected CI input, with synthetic values used in public tests. Scan existing history and decide whether a coordinated rewrite is needed. Do not merely move the values into a different committed file.
3. Add a full-history secret scanner and repeat prevention, with redacted reports and push protection where available. Review findings by credential type; public API configuration is not automatically a secret. The small pattern scan performed during this audit is only a baseline.
4. Add `X-Content-Type-Options: nosniff`, a suitable `Referrer-Policy`, a narrow `Permissions-Policy` and framing protection through `frame-ancestors 'none'` (plus X-Frame-Options DENY where useful). Verify on real HTML responses. Preserve existing HTTPS/HSTS; assess historical subdomains before broadening HSTS to subdomains or preload.
5. Start a compatible CSP in Report-Only, inspect actual violations, then enforce tested directives. Include restrictions on framing, objects and base URLs. Account for Next.js hydration/JSON-LD and existing inline styles/scripts. Do not blindly add a strict `script-src 'self'` policy that breaks hydration, or introduce per-request nonces without considering their dynamic-rendering impact on this static site. Choose a tested hash/static-compatible approach or document any necessary allowances. [Next.js CSP guidance](https://nextjs.org/docs/app/guides/content-security-policy).
6. Use the checked-in lockfile for reproducible installs (`npm ci`), record an appropriate Node engine/CI runtime, and address verified advisories in both production and development dependencies. Review upgrades individually and rebuild; do not run a blind force-fix.

Acceptance: secret/private inputs stay untracked, example configuration stays available, scans pass with recorded limitations, intended headers are present, and navigation/hydration/print/download remain functional under the enforced policy.

### 6. Make release checks detect the observed failures

Files: `scripts/qa-sweep.py`, shared route inventory or equivalent generated fixture, dependency/test configuration, `.github/workflows/` and verification documents.

1. Add explicit `expected_environment` and `expected_origin` inputs. In production mode fail on disallow-all robots, HTML/meta noindex, an indexing-prohibition response header, missing sitemap declaration or a different origin. In preview mode assert noindex/disallow instead.
2. Parse sitemap XML and compare the exact URL set with the public route inventory. Check duplicates, omissions and unexpected URLs. Compare each route's canonical to the exact expected URL, not merely an HTTPS prefix; check OG URLs and schema IDs too.
3. Derive routes from content/shared routing or enforce a generated comparison. The current `allRoutes` list and Python route list are both handwritten; the README's assertion that a page cannot ship without a sitemap entry is not enforced by the architecture alone.
4. Add negative regression fixtures for the failures actually found: wrong-host HTTPS canonicals; an 18-entry sitemap with duplicate/missing routes; production noindex/disallow; missing required browser coverage; accidentally indexable preview; malformed/missing production origin. These checks justify tests because the existing script misses real deployment defects.
5. Require the browser runtime in release CI or fail with an explicit incomplete result. A locally optional browser run may skip it, but must not print “all checks clean.” Record versions and dependencies for reproducible execution.
6. Cover mobile menu Tab/Shift+Tab containment, Escape, close, focus return, link navigation, route changes/back navigation, desktop resize and scroll-lock cleanup. Verify the no-JavaScript experience has a way to reach navigation routes, as the current mobile Menu button depends on JavaScript.
7. Run at 390, 768 and 1440 widths; test reduced motion and no-JavaScript rendering; inspect the longer new headline and résumé print pages. Fix the target-size filter's unused `inline` flag so its documented inline-link exceptions are handled intentionally.
8. CI order: reproducible dependency install; typecheck; lint; production build with explicit environment; served-build HTTP/content/browser sweep; PDF existence/content check; preview build with separate indexing checks. Keep audit/secret-scan failures visible and avoid exposing private denylist values in logs.
9. Refresh `CONTENT_VERIFICATION.md`, `PRIVACY_REVIEW.md`, `SEO_VERIFICATION.md`, `REMAINING_MANUAL_ACTIONS.md` and README from actual results. Label historical checks with their date/commit; do not carry forward an old “verified” status as proof of the next deployment.

Acceptance: the new checks fail against intentionally bad fixtures and pass against both correctly configured environments; a missing tool cannot masquerade as full verification. Run the documented `npm run typecheck`, `npm run lint` and `npm run build` before release, then perform live smoke checks after deployment.

## Separate account/repository follow-up from the reports

These recommendations were considered but are outside a local v5 code change:

- Rewrite the GitHub profile bio and pins to match current professional work; verify current profile state first because this audit did not independently inspect it. Pin only repositories that have passed their security/content review. A sanitized Oracle example is optional; never publish client code or data.
- Align LinkedIn headline, exact experience title (Consultant I), About, skills, certifications and Featured links after the portfolio is corrected. No messages or requests for recommendations should be sent without an explicit instruction.
- Recheck other linked projects before promoting them. Sherbimet's SQL construction and missing shared backend layer, Eventos' local database requirements, and PU Nav's mapping/Firebase configuration are documented review leads, not confirmed vulnerabilities in v5. They need their own code/data authorization review.
- Keep product-role aspirations out of current professional titles without evidence. The reports' market scores and projected ATS scores are editorial estimates, not measured outcomes or guarantees. No new job-market survey is needed to implement this portfolio correction.
- OIC certification and a new photograph are optional future improvements, not prerequisites for correcting the site.

## Suggested delivery batches and dependencies

| Batch | Scope | Depends on | Reviewable result |
| --- | --- | --- | --- |
| A0: Framework security update | Patched Next.js/lint config, refreshed sharp/transitives, advisory review | Approved advisory check completed; compatible release verification | Reviewed dependency diff, fresh audit and working production build |
| A: Immediate containment | Suppress unsafe TripTogether link; fix public private-data fixtures; tighten env ignores | No missing content facts | Small portfolio/repository safety patch; separate credential incident remains open |
| B: Canonical and release safeguards | Validate origins, correct docs/examples, repair QA and deployment variables | Access to hosting project for the external settings | Local patch plus recorded production/preview checks; corrected live robots/canonicals |
| C: Content alignment | Consultant I, public Fusion/OIC title, support wording, chart consistency, skills/case summaries and OG asset | Exact title already confirmed; use uncounted “multiple” until support count is supplied | One internally consistent content revision |
| D: Résumé delivery | Correct the received PDF baseline, add certifications, remove public phone, publish and wire download | PDF received/reviewed; title confirmed; editable source if available, otherwise regenerate from reviewed content; batch C consistency | Final corrected PDF re-rendered/rechecked and working download |
| E: Hardening and accessibility | Headers/CSP, modal navigation, reproducible CI and advisory fixes | Tested framework policy and completed dependency review | Compatibility-verified hardening patch |
| F: Account cleanup | Credential revocation/history rewrite, historical-host redirects, Search Console, GitHub and LinkedIn | Provider/account access; coordination for destructive history changes | Recorded account-side results and updated action log |

Do credential revocation immediately if exposure is still active; do not wait for batch F or for résumé work. Publish the canonical repair after the framework security update and safety/release gates pass; the PDF can follow in its own release if its content/privacy corrections are not yet complete. Recheck the deployed environment and live HTML after every release because local code cannot guarantee hosting configuration.

## Remaining decisions and verification status

- Confirmed by user: **Consultant I**.
- Proposed canonical: existing **https://viditpujara.me**.
- Unconfirmed: concurrent support-environment count, any new keyword claims, second implementation details and preference for the longer-term direction statement. Safe implementation does not require inventing these details.
- Résumé receipt/review: complete for the supplied PDF identified by the SHA-256 above. Its header, metadata, support structure and visible URLs are already improved; both input pages rendered cleanly. Editable source is still unavailable.
- Résumé publication: pending Consultant I employment-title correction, certifications, public-phone/annotation removal, resolution of the generic second-project bullet and final corrected-file verification. No PDF has been copied to `public/` or published.
- Pending external proof: TripTogether key classification/revocation, backend authorization and history cleanup; Vercel changes; Search Console; historical-host redirect configuration.
- Dependency audit: completed with user approval; 22 affected entries (1 critical, 5 high, 16 moderate). Recorded above and in the saved JSON; fixes are planned, not applied.
- Builds/browser checks: specified as implementation acceptance gates, not executed or claimed passed during this audit. PDF input inspection/rendering is complete; final corrected-file and download checks remain pending implementation.
