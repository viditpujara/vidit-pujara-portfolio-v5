# AGENTS.md: repository rules for all coding agents

Rules-Version: 1

These rules apply to every AI coding agent working in this repository (Claude Code, Codex, Antigravity and any agent added later). They are the single source of truth. Platform-specific files (`CLAUDE.md`, `.agents/rules/`) only point here and must not duplicate or contradict this file.

**Owner and final authority:** Vidit Pujara (`@viditpujara`). The owner approves plans and is the only person who approves and merges pull requests.

**This repository is public.** Everything committed, including task records, is world-readable. Never commit secrets, credentials, private environment files, personal data, client or vendor names, or private requirement text.

If asked "which rules version are you following?", answer with the `Rules-Version` above and the branch prefix in section 5.

Details, templates and procedures live in `docs/`. Start at [docs/README.md](docs/README.md). The mandatory rules are in this file so they load even when nothing else does.

## 1. Order of precedence

1. The owner's explicit instruction in the current task.
2. This file.
3. Documents it links to.
4. Your tool's defaults.

The owner's instruction can change the plan or scope of a task. It does not remove the approval, branch, PR or privacy rules below unless the owner says so in plain words for that task. If instructions conflict, stop and ask. Do not pick silently.

## 2. Project invariants (preserve these)

- Install with `npm ci --ignore-scripts`. Build with `npm run build` (it uses `next build --webpack`).
- Production builds require `NEXT_PUBLIC_SITE_ENV=production` and `NEXT_PUBLIC_SITE_URL=https://viditpujara.me` at build time. Preview builds must never enable the production flag. Never weaken `src/lib/environment.ts`, the QA checks, the security headers or the secret scanning to make a check pass.
- Public content names no clients, vendors or internal systems, and publishes no phone number other than the owner-approved `identity.phone`. Keep `.qa-private.json` ignored.
- Do not invent facts, counts or credentials. Ranges stay ranges. Unverified claims are not published. See `CONTENT_VERIFICATION.md` and `PRIVACY_REVIEW.md`.
- The TripTogether repository link stays withheld until key rotation is verified (`REMAINING_MANUAL_ACTIONS.md`).
- Do not rewrite Git history, rotate credentials, change DNS, hosting, GitHub settings or production environment variables without explicit authorization.
- Dated reports in `docs/audit/` and the root-level audit files are historical evidence, not current claims.

## 3. Starting a task

1. Read this file, then [docs/README.md](docs/README.md) and the recent entries of `docs/agents/*/README.md` for related history.
2. Identify yourself in the task record: agent name, platform, model or version (only if your tool states it, otherwise `unknown`), task ID, description, start date, requirements, branch, status. Never fabricate model names, versions, timestamps or identifiers.
3. Check `git status`, the current branch, open pull requests and remote branches (`git branch -r`) for overlapping work. If another agent is changing related files, stop and tell the owner.
4. Find the relevant requirements (section 8).

**Task ID:** `YYYY-MM-DD-<slug>` using the UTC date and a lowercase kebab-case slug (for example `2026-11-07-portfolio-navigation`). Check that no folder under `docs/agents/*/` and no remote branch already uses it. On a collision append `-2`, `-3` and so on.

## 4. Approval before implementation

- **Substantial work** is anything other than a typo, comment or documentation-only fix. This includes changes under `src/`, `public/`, `scripts/`, `tests/`, `.github/`, config files and `package*.json`, and anything that changes published content. Prepare a written plan (scope, files, risks, validation, acceptance criteria) and obtain the owner's explicit approval before modifying tracked files. Record that approval in the task record.
- **Small changes** may proceed under the original request. They still use a branch, a pull request and a concise task record.
- New dependencies need a recorded reason and the owner's approval.

## 5. Git rules

- **Never commit or push directly to `main`** (or any protected default branch).
- Before editing tracked files: check `git status`, confirm the base is current `origin/main`, and create a dedicated branch.
- **Branch name:** `agent/<agent-slug>/<task-id>`, for example `agent/claude-code/2026-11-07-portfolio-navigation`. Agent slugs are in [docs/agents/README.md](docs/agents/README.md). If your tool created a branch or worktree with another name, rename it locally with `git branch -m` before the first push.
- Never overwrite, rebase or push to another agent's branch. Never force-push, `git reset --hard`, `git clean`, discard changes, or amend pushed commits.
- Never include unrelated changes in a commit. If the working tree holds unexpected changes, stop and report, or use a separate worktree.
- Keep `main` merged into your branch rather than rewriting it. Revalidate after the base moves.
- Do not change Git identity or configuration. If a commit fails because identity is unset, report that as a blocker.
- Do not assume push or PR creation will work. If either fails, keep the work committed locally and report the exact error and the manual steps.

**Commits** follow Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`) and end with trailers:

```
Agent: <agent-slug>
Task: <task-id>
```

plus whatever `Co-Authored-By` attribution your tool is configured to add. Commit source changes and the task record on the same branch.

## 6. Pull requests

Every implementation goes through a pull request using [.github/pull_request_template.md](.github/pull_request_template.md). Fill in every section, and write "none" or "not applicable" rather than deleting one. The PR must contain the task record and every document needed to review the change.

- State exactly which checks you ran and their results. Mark anything not run as "not run". Never claim CI, branch protection or tests passed without evidence (a command output or a link to the run).
- End with a **Recommended review decision**, one of: *Ready for human review*, *Changes required*, *Blocked by unresolved issues*, *Ready for approval after checks pass*. This is a recommendation, not an approval.
- Keep one task per PR. Unrelated fixes go in separate PRs.

## 7. Human authority

Agents may prepare, commit, push and open pull requests, and may recommend approval or changes. Agents must not:

- approve their own pull requests or merge any pull request without the owner's explicit instruction;
- bypass, disable or alter branch protection, rulesets, CI or other repository settings;
- deploy to production;
- close, supersede or retarget pull requests that are not theirs.

Merge gates the owner applies: requirements met, scope respected, documentation complete, relevant tests pass, CI green, no critical security or functional issues, visual validation for UI, no conflicts, feedback addressed, owner approval.

## 8. Requirements and traceability

- Requirement summaries live in `docs/requirements/`. The owner's private source documents (for example `/Users/vidit/Downloads/files`) are **not** copied into this repository. Read them locally when relevant, and bring content in only through the process in [docs/requirements/README.md](docs/requirements/README.md).
- Every task record lists the requirement IDs it addresses (or `none`), maps them to the files changed and to verification evidence, and lists anything deferred or conflicting.

## 9. Documentation contract

- **Location:** `docs/agents/<agent-slug>/<task-id>/README.md`. Create your own folder the first time you need it. Do not create folders for other agents. Complex tasks may split into `plan.md`, `analysis.md`, `changes.md`, `decisions.md`, `verification.md` and `handoff.md`, with `README.md` as the index.
- **Index:** add one line per task to `docs/agents/<agent-slug>/README.md` (your own). There is no shared task table, so parallel PRs do not conflict.
- **Write only to your own folder.** You may read everything. Never edit, delete or rewrite another agent's records. To correct one, add a dated note in your own record that links to it.
- **Shared knowledge** belongs in the shared places: decisions in `docs/decisions/`, system knowledge in `docs/architecture/`, requirements in `docs/requirements/`. Update them when appropriate, and supersede rather than erase.
- **Contents** (template: [docs/development/templates/task-record.md](docs/development/templates/task-record.md)): task summary, initial analysis, plan, implementation record, technical decisions, verification, handoff and review. Small tasks may use a short combined record. Record concise rationale and observable evidence, never invented analysis, test results or history, and never transcripts of internal reasoning.
- **Status values:** `planning`, `approved`, `in-progress`, `ready-for-review`, `changes-requested`, `merged`, `abandoned`, `superseded`. A record cannot truthfully say `merged` before the merge, so set `ready-for-review` or `changes-requested` in the PR. Merge outcomes are read from GitHub and `git log`.
- **Retention:** never delete completed records. If a decision is superseded, add a new decision record that links the old one.
- **Git:** documentation must not be excluded by `.gitignore`. Task and agent slugs must not be `output`, `tmp`, `build` or `out`, which `.gitignore` matches at any depth. Check with `git check-ignore -v <path>` before committing.
- **Chat history and tool-private artifacts are not records.** Copy anything durable into the task record.

## 10. Working alongside other agents

- Use a separate branch per task, and a separate Git worktree when two agents work at once.
- Do not touch another agent's uncommitted work or branch.
- If you continue another agent's task, open your own task ID with `continues: <original-task-id>` in the front matter and record what you changed.
- Record dependencies between tasks (`depends-on`) and handoffs in the task record.
- Before requesting review, merge the latest `origin/main` into your branch and revalidate.

## 11. Validation

Use the project's real commands and report exact results:

```bash
npm ci --ignore-scripts
npm run typecheck
npm run lint
npm test
NEXT_PUBLIC_SITE_URL=https://viditpujara.me NEXT_PUBLIC_SITE_ENV=production npm run build
npm run security:scan
```

For page or UI changes also run the browser tests (`npm run test:browser`) and `python3 scripts/qa-sweep.py http://127.0.0.1:3100 --origin https://viditpujara.me --environment production` against a local production build, check 390, 768 and 1440 px, keyboard focus and reduced motion, and attach screenshots to the PR. Documentation-only changes need no build, but check links and that nothing is ignored by Git. CI (`.github/workflows/verify.yml`) runs on every push and pull request.

## 12. When blocked

If you hit a conflict, an unexpected working tree, a failed push, an unavailable tool or a permission you do not have: stop, keep work safe (commit locally), and report the exact blocker and the manual steps to the owner. Do not work around it with a destructive or unauthorized command.

## 13. Adding another agent

Give the new agent's native instruction file a minimal pointer to this file (do not copy the rules), add its slug to [docs/agents/README.md](docs/agents/README.md), and check it with the probe in [docs/development/agent-workflow.md](docs/development/agent-workflow.md).
