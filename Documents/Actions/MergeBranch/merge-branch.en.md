# merge-branch

A GitHub Action that attempts to merge one branch into another. It reports a merge conflict without creating a pull request; the calling Workflow decides what to do next.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `token` | Yes | - | GitHub token with `contents: write` permission |
| `repository` | Yes | - | Repository in `owner/name` format |
| `api-url` | No | `https://api.github.com` | GitHub API base URL |
| `source-branch` | Yes | - | Branch to merge |
| `source-sha` | No | Empty | Expected source commit; a newer branch commit produces `stale` |
| `target-branch` | Yes | - | Branch receiving the merge |

## Outputs

| Output | Default | Description |
|---|---|---|
| `outcome` | - | `merged`, `conflict`, or `stale` |

## Input example

```yaml
- id: merge
  uses: Sunnymoon724/kozae-forge/actions/merge-branch@main
  with:
    token: ${{ github.token }}
    repository: ${{ github.repository }}
    api-url: ${{ github.api_url }}
    source-branch: feature/example
    source-sha: ${{ github.sha }}
    target-branch: main
```

## Output example

```yaml
outcome: conflict
```

Only HTTP 409 is treated as a merge conflict. Permission and branch-rule errors fail the Action.
