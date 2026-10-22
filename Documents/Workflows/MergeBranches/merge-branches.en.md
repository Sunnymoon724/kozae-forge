# Merge branches

A reusable Workflow that merges the latest commits from multiple remote branches into a selected target branch in order. The calling repository controls the schedule and branch list.

## 1. Process

1. Check out the target branch.
2. Merge each input source branch into the target branch in order.
3. Push the merged target branch.

If a merge conflict occurs, the Workflow fails without pushing. The target branch is updated from its remote branch before the source branches are merged.

## 2. Usage

The calling repository defines the schedule and branches.

### Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `runner` | No | `ubuntu-latest` | Runner label used for the merge job |
| `target-branch` | No | `main` | Branch that receives the merges |
| `source-branches` | Yes | - | Source branch names, one per line |

The calling Workflow needs `contents: write` permission for the target branch.

```yaml
name: Scheduled branch merge

on:
  schedule:
    # 04:00 Asia/Seoul = 19:00 UTC on the previous day
    - cron: '0 19 * * *'
  workflow_dispatch:

permissions:
  contents: write

jobs:
  merge:
    uses: Sunnymoon724/kozae-forge/.github/workflows/merge-branches.yml@main
    with:
      target-branch: main
      source-branches: |
        develop
        chronicle
        release
```

## 3. Notes

- Branches are merged in the order provided.
- Merge conflicts fail the Workflow instead of being resolved automatically.
- `source-branches` must not include `target-branch`.
- The Workflow fails if branch protection prevents a direct push.
- Scheduled runs may start slightly later than the scheduled time.
