# Documentation map

Start with [AGENTS.md](../AGENTS.md) at the repository root. It holds the rules every coding agent follows. This directory holds the history and the detail behind them.

This repository is public. Do not put secrets, personal data, client or vendor names, or private requirement text in any document here.

## Where things go

| Path | Contents | Who writes |
| --- | --- | --- |
| [agents/](agents/README.md) | Per-agent task records, one folder per task | Each agent, only in its own folder |
| [decisions/](decisions/README.md) | Architecture and process decisions (ADRs) | Any agent or the owner; supersede, never erase |
| [requirements/](requirements/README.md) | Sanitised requirement summaries and the intake process | Added through the process there, with owner approval |
| [development/](development/agent-workflow.md) | Workflow, Git and PR procedures, templates | Changed only by a governance task |
| `architecture/` | How the system fits together | Created by the first task that needs it |

## Existing material

These predate the governance system. They are dated evidence, not current claims.

- [audit/](audit/IMPLEMENTATION_STATUS.md): 1 November 2026 implementation status, release handoff, scan output.
- [screenshots/](screenshots/README.md): design captures.
- [resume.json](resume.json): editable source for the public résumé PDF.
- Root-level reports: `AUDIT_AND_IMPLEMENTATION_PLAN.md`, `CONTENT_VERIFICATION.md`, `DOMAIN_AND_SEARCH_SETUP.md`, `PRIVACY_REVIEW.md`, `REMAINING_MANUAL_ACTIONS.md`, `SEO_VERIFICATION.md`, `V5_DESIGN.md`.

## Finding history

- Tasks by an agent: `docs/agents/<agent-slug>/README.md` (one line per task).
- All tasks, newest first: `ls -d docs/agents/*/20* | sort -t/ -k4 -r`
- Decisions: `docs/decisions/` (numbered).
