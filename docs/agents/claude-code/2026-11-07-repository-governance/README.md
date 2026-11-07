---
task-id: 2026-11-07-repository-governance
agent: claude-code
platform: Claude Code desktop app (Code tab)
model: Claude Sonnet 5.5 (claude-sonnet-5-5), as stated by the session
rules-version: 1
description: Establish the shared repository governance system for all AI coding agents
started: 2026-11-07
requirements: none (owner's governance brief, 2026-11-07)
branch: agent/claude-code/2026-11-07-repository-governance
status: ready-for-review
commits: see `git log agent/claude-code/2026-11-07-repository-governance`
pr: https://github.com/viditpujara/vidit-pujara-portfolio-v5/pull/2
continues:
depends-on:
---

# Repository governance setup

This is the bootstrap task. `AGENTS.md` did not exist when it started, so it follows the rules it creates.

## A. Task summary

- **Requested:** a permanent, repository-level governance system so Claude Code, Codex, Antigravity and later agents follow one set of rules for documentation, Git and pull requests, with the owner holding final approval and merge authority.
- **Why:** implementation history lived in chat sessions and root-level reports. There were no agent instruction files, PR template or code owners, and `main` was unprotected.
- **Expected outcome:** one authoritative rule file, minimal adapters per platform, a documentation structure and conventions, a PR template, and a validation method. Per-agent task folders are created later by the agents that need them.
- **Scope / exclusions:** no application code, CI, `.gitignore`, dependency or GitHub-settings changes. No portfolio requirements implemented. No requirement documents imported.

## B. Initial analysis

- **Existing state (inspected read-only):** no `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.claude/`, `.agents/` or `.agent/` anywhere; no user-level equivalents. `.github/` held only `workflows/verify.yml`. Public GitHub API showed `main` unprotected, no rulesets, one merged PR (#1, authored by the owner), three successful CI runs, community health 14%.
- **Git state:** clean tree, `main` equal to `origin/main` (`7de9ec2`), remote `origin` over HTTPS, no local or global `user.name`/`user.email`.
- **Constraints found:** the repository is public (task records are world-readable); agents push under the owner's identity, so the owner cannot approve their own PRs on GitHub; `.gitignore` patterns `output/`, `tmp/`, `build`, `out` match at any depth.
- **Existing rules preserved:** build and install commands, production environment guard, privacy rules (no client names or phone), no invented claims, TripTogether link withheld, no history rewriting. They are collected in `AGENTS.md` section 2.
- **How agents load rules (from public documentation and third-party guides, not tested here):** Codex reads `AGENTS.md` with a 32 KiB default cap. Claude Code reads `CLAUDE.md` and supports `@path` imports. Antigravity reportedly reads `.agents/rules/` and, since v1.20.3, `AGENTS.md`. The Antigravity details come from third-party sources and need the probe.

## C. Implementation plan

- **Plan:** presented to and approved by the owner in chat on 2026-11-07 ("Approve, use defaults"). Defaults applied: Antigravity adapter created; `CODEOWNERS` included; branch format `agent/<agent>/<yyyy-mm-dd>-<slug>`; merge commits recommended; agents continue to push as the owner; plan approval required for substantial work only; three-line README pointer; no GitHub settings changed; requirement import deferred to a separate task.
- **Owner approval:** given in chat as above.
- **Acceptance criteria:** the files in section D exist; `AGENTS.md` is well under 32 KiB; links resolve; nothing is ignored by Git; no application files changed.

## D. Implementation record

- **Created:**
  - `AGENTS.md`, `CLAUDE.md`, `.agents/rules/repository-governance.md`
  - `.github/pull_request_template.md`, `.github/CODEOWNERS`
  - `docs/README.md`, `docs/agents/README.md`, `docs/agents/claude-code/README.md`, this record
  - `docs/development/agent-workflow.md`, `docs/development/templates/task-record.md`
  - `docs/requirements/README.md`
  - `docs/decisions/README.md`, `docs/decisions/0001-repository-governance.md`
- **Modified:** `README.md` (a "Working on this repository" section, 4 lines).
- **Removed:** none.
- **Behavioural changes:** none to the site. The only runtime-visible effect is on agents and contributors.
- **Deviations from the plan:** `docs/architecture/` was not created, as planned (on demand). `scripts/check-governance.py` was not created, as planned (optional, separate PR).

## E. Technical decisions

Recorded in [docs/decisions/0001-repository-governance.md](../../../decisions/0001-repository-governance.md). Summary: one rule file with import or pointer adapters, per-agent record folders with per-agent indexes (no shared task table), PR template, sanitised-summary requirement intake because the repository is public.

## F. Verification

| Check | Command | Result |
| --- | --- | --- |
| `AGENTS.md` size | `wc -c AGENTS.md` | 11,589 bytes (under the 32 KiB Codex default) |
| Rules version present | `grep -n '^Rules-Version' AGENTS.md` | `Rules-Version: 1` on line 3 |
| Relative links | small Python script over all new Markdown files | 15 files checked; 1 flagged, which is the illustrative example link inside a fenced block in `docs/agents/README.md`, not a real link |
| Not ignored by Git | `git check-ignore -v` on every new path, including this record | no output (nothing ignored) |
| Credential patterns | `python3 scripts/scan-secrets.py` | PASS (the script states it is not a complete audit) |
| Application files untouched | `git status --short` | only the files listed in section D |

- **Not run:** typecheck, lint, tests and build (no application code changed; CI runs them on the PR). The probe in `docs/development/agent-workflow.md` was **not run** against Codex or Antigravity, and not run in a fresh Claude Code session. Whether each agent actually loads the rules is therefore unverified.
- **Known limitations:** Antigravity's instruction behaviour rests on third-party documentation. `main` is not protected, so "no direct pushes" remains procedural until the owner applies the settings in `docs/development/agent-workflow.md`.

## G. Handoff and review

- **Remaining work (owner):**
  1. Review and merge the PR.
  2. Run the probe for each agent in a fresh session.
  3. Optionally apply the recommended GitHub settings.
  4. Decide whether to pick a single commit author email (history uses two).
- **Remaining work (separate tasks):** optional `scripts/check-governance.py`; sanitised import of the portfolio requirement documents; the portfolio content alignment plan prepared earlier in this session.
- **Known risks:** agents may ignore rules their tool does not load (hence the probe); the rule file will need small revisions once the probe is run.
- **Rollback:** revert the merge commit (`git revert -m 1 <sha>`). Nothing outside documentation, agent rule files and `.github/` templates changes.
- **Pull request:** [#2](https://github.com/viditpujara/vidit-pujara-portfolio-v5/pull/2). The first push failed for lack of credentials (HTTPS remote, no helper). It was pushed afterwards using the owner's `gh` login for that one command, with the owner's go-ahead. CI had two checks passing and three pending when last read; the final result is on the PR.
- **Reviewer instructions:** read `AGENTS.md` first; check `.github/pull_request_template.md` against your 18 required PR items; skim `docs/development/agent-workflow.md`; confirm no application files changed in the diff.
- **Recommended review decision:** Ready for human review. This is a recommendation, not an approval. CI has not been observed for this branch yet.
