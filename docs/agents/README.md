# Agent task records

Each coding agent keeps a record of every task it performs, in its own folder. The rules are in [AGENTS.md](../../AGENTS.md); this page holds the conventions.

Agents create their own folder the first time they need it. Folders are not created in advance.

## Known agent slugs

| Slug | Agent | Branch prefix | Native instruction file |
| --- | --- | --- | --- |
| `claude-code` | Claude Code (Anthropic) | `agent/claude-code/` | `CLAUDE.md` imports `AGENTS.md` |
| `codex` | OpenAI Codex | `agent/codex/` | `AGENTS.md` (read natively) |
| `antigravity` | Google Antigravity | `agent/antigravity/` | `.agents/rules/repository-governance.md` points to `AGENTS.md` |

### Adding an agent

1. Choose a lowercase kebab-case slug from the product name. It must not be `output`, `tmp`, `build` or `out`.
2. Add a minimal pointer in the agent's native instruction file that sends it to `AGENTS.md`. Do not copy the rules.
3. Add a row to the table above.
4. Run the probe in [development/agent-workflow.md](../development/agent-workflow.md#probing-that-an-agent-loads-the-rules).

## Task IDs and folders

- **Task ID:** `YYYY-MM-DD-<slug>`, UTC date, lowercase kebab-case slug.
- **Folder:** `docs/agents/<agent-slug>/<task-id>/`
- **Branch:** `agent/<agent-slug>/<task-id>`
- Before choosing an ID, check that no folder under `docs/agents/*/` and no remote branch uses it. On a collision append `-2`, `-3` and so on.

## Required front matter

Every task `README.md` starts with this. Do not guess a value: write `unknown` or leave it blank until it is known.

```yaml
---
task-id:
agent:            # slug
platform:         # e.g. Claude Code desktop app
model:            # only if the tool states it, else "unknown"
rules-version:    # from AGENTS.md
description:
started:          # UTC date
requirements:     # IDs, or "none"
branch:
status:           # planning | approved | in-progress | ready-for-review | changes-requested | merged | abandoned | superseded
commits:          # informational; a squash merge replaces them
pr:               # URL once created
continues:        # task-id this continues, if any
depends-on:       # task-ids, if any
---
```

## Statuses

`planning` → `approved` → `in-progress` → `ready-for-review` ⇄ `changes-requested` → `merged`, or `abandoned` / `superseded`.

A record is written before its pull request merges, so it stops at `ready-for-review` or `changes-requested`. Whether it merged is read from GitHub and `git log`. When the owner asks, an agent may open a small close-out PR that sets `merged` or `abandoned` on finished records.

## Per-agent index

Each agent keeps `docs/agents/<agent-slug>/README.md` with one line per task, newest first:

```
- [2026-11-07-portfolio-navigation](2026-11-07-portfolio-navigation/README.md): short description. PR: <link or "none">
```

There is deliberately no shared task table, so parallel PRs from different agents never conflict.

## Rules for the records

- Write only in your own folder. Read anything.
- Never edit, delete or rewrite another agent's records. To correct one, add a dated note in your own record that links to it.
- Never delete a completed record. Superseded decisions are recorded in [../decisions/](../decisions/README.md).
- Keep records proportional. A small change needs a short record; do not restate the diff.
- Record evidence (commands, outputs, links) and concise rationale. No internal reasoning transcripts, no invented history.
- Tool-private artifacts and chat history are not records. Copy anything durable here.
