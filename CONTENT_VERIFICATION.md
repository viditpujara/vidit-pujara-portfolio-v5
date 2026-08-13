# Content verification, Version 5

Version 5 is a redesign, not a rewrite of the facts. Professional content was
carried forward from Version 4, which carried it from Version 3, where it was
verified against the brief, the repositories and the issuer credential pages.
The original evidence tables live in the Version 1 to Version 4 repositories.

This document records what Version 5 verified for itself and what it changed.

## File level provenance

| Content file | State in Version 5 |
| --- | --- |
| `projects.ts` | Byte identical to Version 4, confirmed by checksum |
| `metrics.ts` | Byte identical to Version 4, confirmed by checksum |
| `figures.ts` | Byte identical to Version 4, confirmed by checksum |
| `site.ts` | One documented addition, below |
| `pages.ts` | Three documented edits, below |
| `case-studies.ts` | One non content change: a lookup helper made total for strict TypeScript. No published string changed |

No metric, date, employer, technology, project claim, credential or contact
detail was altered anywhere.

## The one factual conflict, and how it was resolved

Version 3 and Version 4 disagreed about the official designation.

- Version 1 recorded: official designation **Associate Consultant**, to be shown
  wherever the designation matters and never replaced by a more senior title.
  Version 3 carried that forward and marked it verified.
- Version 4 changed the field to **Oracle ERP Technical Consultant** while
  keeping the same source citation, and left a redundant sentence behind
  ("Oracle ERP Technical Consultant at Mastek since July 2024, working publicly
  as an Oracle ERP Technical Consultant"), which indicated a late string
  replacement rather than a re verified fact.

This was raised rather than guessed. **Vidit confirmed on 13 August 2026 that
the official designation is Oracle ERP Technical Consultant.** The field is
therefore restored in `site.ts` with that value and a comment recording the
confirmation.

Because the official designation and the public title are now the same string,
the site does not print it twice on one page. The redundant clauses introduced
by Version 4 were removed, which reduces a claim rather than adding one.

## Edits made in Version 5

| File | Change | Reason |
| --- | --- | --- |
| `site.ts` | `officialDesignation` restored, equal to `publicTitle`, with a dated comment | Records the confirmed resolution while keeping the distinction modelled |
| `pages.ts` | `about.facts` row "Public title, Oracle ERP Technical Consultant" replaced with "Focus, Oracle Integration Cloud" | The previous row duplicated the row directly above it. The replacement restates the verified specialisation |
| `pages.ts` | Removed "working publicly as an Oracle ERP Technical Consultant" from the about narrative | Redundant once the two titles are the same string |
| `pages.ts` | Removed the unused `experienceRoleNote` and `experience.publicRole` fields | Same redundancy, and neither is rendered in Version 5 |

## Claims Version 5 verified directly

| Claim | How it was checked |
| --- | --- |
| Project repositories exist and are public | All five repositories, plus the four previous portfolio repositories, were downloaded from GitHub during the build |
| No project has a public deployment | No deployment link is published anywhere; the projects index states this explicitly |
| Attribution, solo versus collaborative | Carried unchanged from `projects.ts`, and rendered as a visible badge and an attribution row on every project page |
| Contact address | `vidit.pujara@zohomail.in`, from the verified content, used in every mailto, the footer and the JSON-LD |
| Portrait | Centre cropped from the supplied photograph to 4:5. No generative editing of any kind was applied |
| Social card | Generated from site tokens and verified strings only. It contains the name, the public title, the employer, the start date, the location and the working shape |

## Rules enforced by the shipped sweep

`scripts/qa-sweep.py` fails the build if rendered output contains a blocked
string, an em dash, an en dash or a double hyphen in visible copy, an image
without alt text, more or fewer than one `h1`, a skipped heading level, a
missing canonical, or invalid JSON-LD. It ran clean across all 18 routes.

## Not published, deliberately

- **Any phone number.** The résumé PDF supplied with this task contains one. It
  appears nowhere in this project.
- **A résumé download.** The only supplied PDF is the historical student résumé:
  it predates the Oracle role, states a degree in progress, and lists a
  superseded email address. A download button pointing at a stale document is
  worse than no button. `/resume` is a print styled page built from current
  verified content, and prints or saves to PDF from the browser.
- **Any client, vendor, internal project or system name.** See
  `PRIVACY_REVIEW.md`.
- **Proficiency scores or percentages** of any kind.
