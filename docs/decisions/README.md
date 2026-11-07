# Decision records

Decisions that outlive a single task are recorded here as short numbered documents (architecture decision records). Task-level detail stays in the task record; link to the decision from there.

## Format

File name: `NNNN-short-title.md`, numbered in order and never reused.

```markdown
# NNNN. Title

- **Status:** proposed | accepted | superseded by NNNN | rejected
- **Date:** YYYY-MM-DD
- **Task:** <task-id>

## Context
## Decision
## Alternatives considered
## Consequences
```

## Rules

- A decision is never deleted or rewritten. To change one, add a new record that supersedes it, and update the old record's status line to `superseded by NNNN`.
- Keep records short and factual.

## Index

- [0001. Repository governance for AI coding agents](0001-repository-governance.md): accepted
