# Requirements

This directory holds **sanitised summaries** of the requirements that drive portfolio work, plus the process for adding them. No requirement documents have been imported yet.

## Why summaries and not copies

The repository is public. The owner's source documents (for example `/Users/vidit/Downloads/files`) can contain a phone number, names of past clients and other private details. They stay on the owner's machine. Agents read them locally when a task needs them and never copy them into the repository verbatim.

## Intake process

1. **Propose.** An agent (or the owner) opens a task to import a requirement set and lists the local source files.
2. **Sanitise.** For each requirement, write a one-line statement in neutral wording. Remove personal data, client or vendor names, private identifiers and anything not needed to implement or verify the requirement.
3. **Record the source** without publishing it:
   - `source`: local file name and section heading (the local directory path is not required).
   - `source-sha256`: hash of the file as read, so a later change to the source is detectable.
   - `reviewed`: UTC date.
4. **Owner approves** the sanitised result in the pull request before it merges.
5. **Maintain.** When a source changes, add a new dated entry. Do not rewrite earlier ones.

## Requirement entries

IDs look like `REQ-<AREA>-NNN` (for example `REQ-SEO-003`). Never reuse an ID. Each entry has:

| Field | Meaning |
| --- | --- |
| ID | Stable identifier |
| Statement | One neutral sentence |
| Source | File name and section; hash recorded in the file header |
| Priority | As stated in the source, or labelled "assessed" |
| Status | `open`, `implemented`, `partial`, `deferred`, `conflicting`, `superseded` |
| Tasks | Task IDs that address it |
| Evidence | Files changed and the verification result, once implemented |
| Notes | Conflicts, ambiguities and decisions (link to `docs/decisions/`) |

## Traceability

Every task record lists requirement IDs, maps them to changed files and verification evidence, and names anything deferred or conflicting. Conflicts between requirements are recorded here and resolved by the owner, then written down as a decision.
