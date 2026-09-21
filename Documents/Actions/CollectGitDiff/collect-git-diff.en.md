# collect-git-diff

Collects the Git diff for a commit range. The Action is intended for a checked-out repository with its Git history available.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `before-sha` | No | Empty | Commit immediately before the range. Use `github.event.before` for a push workflow. |
| `after-sha` | No | `GITHUB_SHA` | Final commit in the range. |
| `repository` | No | `GITHUB_REPOSITORY` | GitHub `owner/repository` used for the source URL. |
| `max-diff-bytes` | No | `90000` | Maximum UTF-8 byte length returned before truncation. |

When `before-sha` is empty or all zeroes, the Action uses the parent of `after-sha`. For an initial commit without a parent, it collects the root diff instead of failing.

## Outputs

| Output | Description |
|---|---|
| `base-sha` | Resolved base commit SHA, if present. |
| `head-sha` | Resolved final commit SHA. |
| `diff` | Diff and range metadata. |
| `has-diff` | Whether a diff exists. |
| `source-url` | GitHub comparison or commit URL. |
| `truncated` | Whether the returned diff was truncated. |

## Input example

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0

- id: diff
  uses: Sunnymoon724/kozae-forge/actions/collect-git-diff@main
  with:
    before-sha: ${{ github.event.before }}
    after-sha: ${{ github.sha }}
    max-diff-bytes: 90000
```

## Output example

```yaml
has-diff: true
truncated: false
source-url: https://github.com/octo-org/octo-repo/compare/base...head
```
