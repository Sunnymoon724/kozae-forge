# collect-commits-by-sha

Collects formatted commit messages for a commit range. The Action is intended for a checked-out repository with its Git history available.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `before-sha` | No | Empty | Commit immediately before the range. Use `github.event.before` for a push workflow. |
| `after-sha` | No | `GITHUB_SHA` | Final commit in the range. |
When `before-sha` is empty or all zeroes, the Action uses the parent of `after-sha`. For an initial commit without a parent, it collects that commit instead of failing.

## Outputs

| Output | Description |
|---|---|
| `base-sha` | Resolved base commit SHA, if present. |
| `head-sha` | Resolved final commit SHA. |
| `commits` | Formatted commit messages and range metadata. |
| `has-commits` | Whether commits exist in the range. |
| `source-url` | GitHub comparison or commit URL. |

## Input example

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0

- id: commits
  uses: Sunnymoon724/kozae-forge/actions/collect-commits-by-sha@main
  with:
    before-sha: ${{ github.event.before }}
    after-sha: ${{ github.sha }}
```

## Output example

```yaml
has-commits: true
source-url: https://github.com/octo-org/octo-repo/compare/base...head
```
