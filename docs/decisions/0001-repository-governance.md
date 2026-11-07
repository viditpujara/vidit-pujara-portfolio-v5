# 0001. Repository governance for AI coding agents

- **Status:** accepted
- **Date:** 2026-11-07
- **Task:** 2026-11-07-repository-governance

## Context

Several AI coding agents (Claude Code, Codex, Antigravity, and others to come) work on this repository. Before this decision there were no agent instruction files, no PR template, no code owners and no per-task documentation. Implementation history lived in chat sessions and in a few root-level reports. The repository is public and `main` was not protected.

## Decision

- `AGENTS.md` at the repository root is the single authoritative rule set. `CLAUDE.md` imports it (`@AGENTS.md`). `.agents/rules/repository-governance.md` points Antigravity to it. Codex reads `AGENTS.md` natively. Platform files stay minimal and do not copy rules.
- Each agent records its tasks in `docs/agents/<agent-slug>/<task-id>/`, writing only to its own folder. Shared knowledge goes in `docs/decisions/`, `docs/architecture/` and `docs/requirements/`.
- Every implementation uses a branch named `agent/<agent-slug>/<task-id>` and a pull request from the template. Agents never push to `main`, never approve their own PRs and never merge without the owner's explicit instruction.
- Substantial work needs the owner's approval of a written plan first.
- Requirement documents are brought into the repository only as sanitised summaries, because the repository is public.
- `.github/CODEOWNERS` names the owner as reviewer.
- The recommended merge method is a merge commit, so commit SHAs cited in task records stay valid.

## Alternatives considered

- **Separate full rule sets per platform:** rejected; they drift and contradict each other.
- **Symlink `CLAUDE.md` to `AGENTS.md`:** rejected; it leaves no room for tool-specific notes and is awkward on some platforms. An import is used instead.
- **A central task table:** rejected; parallel PRs would conflict on it. Each agent keeps its own index.
- **Heavy tooling (commit linting, hooks, required code-owner approvals):** rejected as disproportionate for a personal portfolio.

## Consequences

- The rules are only as binding as each tool's willingness to read them. The probe in `docs/development/agent-workflow.md` checks that each agent loads them.
- Without branch protection, "no direct pushes to `main`" is a procedural rule. Protection settings are recommended in `docs/development/agent-workflow.md` and are the owner's to apply.
- Because agents push under the owner's GitHub identity, GitHub will not let the owner approve a PR they authored. The owner's merge is the approval unless a separate agent identity is introduced later.
