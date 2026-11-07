# Agent workflow

The detailed procedure behind [AGENTS.md](../../AGENTS.md). If this page and `AGENTS.md` disagree, `AGENTS.md` wins and this page should be fixed.

## Lifecycle

1. **Read the rules** (`AGENTS.md`) and the relevant history (`docs/README.md`, recent `docs/agents/*/README.md`).
2. **Identify the task.** Choose the task ID. Check it is unused.
3. **Inspect requirements.** Find entries in `docs/requirements/`. Read private source documents locally if needed. Do not copy them in.
4. **Analyze the code.** Read the files that matter. Check for overlapping work (below).
5. **Prepare a plan.** Scope, files, risks, validation, acceptance criteria.
6. **Obtain approval** for substantial work. Record who approved and where.
7. **Create the branch** (below).
8. **Implement** in small commits.
9. **Document** in the task record as you go.
10. **Validate** with the real commands (AGENTS.md section 11). Record exact results.
11. **Commit** source and documentation together.
12. **Push** only your task branch.
13. **Open the pull request** from the template.
14. **Human review.** Respond to feedback with new commits; set the record to `changes-requested`, then back to `ready-for-review`.
15. **Human approval and merge** by the owner only.

## Pre-flight

```bash
git status -sb                         # must be clean, or isolate your work
git fetch origin                       # refresh remote state
git branch -r                          # other agents' active branches
git log --oneline origin/main -5       # confirm the base
ls docs/agents/*/                      # existing task IDs
```

Overlap check: compare the files you expect to change against open PRs and recent records. If another agent is working on related files, stop and tell the owner, or record a `depends-on` relationship.

## Creating the branch

```bash
git switch -c agent/<agent-slug>/<task-id> origin/main
```

If your tool created another branch or worktree, rename it before the first push:

```bash
git branch -m agent/<agent-slug>/<task-id>
```

Never push under another name, and never push to another agent's branch.

## Commits

Conventional Commits with trailers:

```
docs: add navigation task record

Agent: codex
Task: 2026-11-07-portfolio-navigation
```

Add the tool's `Co-Authored-By` attribution if it is configured. Do not change Git identity settings. Keep unrelated changes out; use `git add <paths>`, not `git add -A`, when the tree might hold other work.

## Pushing and opening the PR

```bash
git push -u origin agent/<agent-slug>/<task-id>
```

Open the PR against `main` using `.github/pull_request_template.md`. With the GitHub CLI: `gh pr create --base main --fill-first` then edit the body. If `gh` or credentials are missing, push if you can, and give the owner the compare URL (`https://github.com/viditpujara/vidit-pujara-portfolio-v5/compare/main...<branch>`) and the PR text. If push fails, keep the commits locally and report the exact error.

After the PR exists, put its URL in the task record in a follow-up commit.

## Revalidating against an updated base

Merge `origin/main` into your branch (do not rebase a pushed branch):

```bash
git fetch origin && git merge origin/main
```

Resolve conflicts by keeping both sides' intent. If a conflict touches another agent's work and you cannot tell the right resolution, stop and ask the owner. Rerun the validation commands afterwards.

## Continuing or handing off a task

- Continuing another agent's task: new task ID with `continues:` and a note of what you changed. Never edit the original record.
- Handoff: the first agent's record lists remaining work, risks and the branch state in its `G. Handoff and review` section.

## Recovery and rollback

- Revert a merged PR: `git revert -m 1 <merge-commit>` on a new task branch, then a PR. Never rewrite `main`.
- Abandon a task: set `status: abandoned` with a short reason in your record. Leave the branch and PR to the owner to close.
- Do not use `reset --hard`, `clean -fd` or force-push to undo work. If you need to discard your own uncommitted changes, say what you are discarding and why.

## Triggers for extra care

State these explicitly in the PR when they apply:

- **Security review:** changes to `next.config.ts` headers, `src/lib/environment.ts`, `.github/`, dependencies, secret scanning, or anything touching credentials.
- **Dependencies:** a new or updated dependency needs a recorded reason and the owner's approval. Run `npm audit --omit=dev`.
- **Performance and accessibility:** page or UI changes get responsive (390/768/1440 px), keyboard and reduced-motion checks.
- **Privacy:** published content must not name clients, vendors or systems, or include a phone number.

## What GitHub can enforce and what is procedural

| Rule | Enforceable on GitHub? | Notes |
| --- | --- | --- |
| No direct pushes to `main` | Yes (branch protection or a ruleset) | Not currently enabled; this is the owner's setting to apply |
| PR required to merge | Yes | |
| CI must pass | Yes | Required checks: the `verify` job for `production` and `preview`, and `secrets`. Confirm exact names in a PR's Checks tab. Do not path-filter required checks |
| No force-push or deletion of `main` | Yes | |
| Conversation resolution | Yes | |
| Owner approval | Partly | Agents push as the owner, so GitHub will not let the owner approve their own PR. The owner's merge is the approval. A separate agent account would allow a required review |
| Agents do not merge or approve | No | Procedural, unless agents use credentials without merge rights |
| Documentation included in the PR | Partly | Reviewer checklist; an optional script could check it |
| Branch, folder and trailer naming | No | Procedural |

Recommended settings for the owner to apply (agents must not change them): protect `main` (require PR, require the CI checks, block force-push and deletion, require conversation resolution), allow merge commits so SHAs cited in records stay valid, and delete head branches automatically after merge.

## Probing that an agent loads the rules

Run in a fresh session at the repository root, for each agent. Give no hint where the rules are.

1. Ask: "What rules version does this repository define, and what branch prefix must you use?" Expected: `Rules-Version: 1` and `agent/<agent-slug>/`.
2. Ask it to list the instruction files it loaded. In Claude Code run `/memory` and confirm `CLAUDE.md` and the imported `AGENTS.md`. Codex should name `AGENTS.md`. For Antigravity, confirm the workspace rule is active in its rules panel.
3. Give a trivial documentation task. Expected: it proposes a plan, uses the right branch name, creates its own task folder, uses commit trailers and opens a PR from the template.
4. Verify `git check-ignore -v docs/agents/<agent-slug>/<task-id>/README.md` prints nothing.
5. For Antigravity only: if step 1 passes with the adapter disabled, it reads `AGENTS.md` natively and the adapter is optional.

Codex stops reading instruction files at 32 KiB by default (`project_doc_max_bytes`). Keep `AGENTS.md` well under that.

## Documentation close-out

When asked, an agent may open a small PR that sets `merged` or `abandoned` on finished records, based on GitHub and `git log`. It changes only the status line and the PR link in records, with a dated note, and does not rewrite them.
