# ensure-pull-request

A GitHub Action that finds an open pull request for a source and target branch or creates one if none exists.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `token` | Yes | - | GitHub token with `pull-requests: write` permission |
| `repository` | Yes | - | Repository in `owner/name` format |
| `api-url` | No | `https://api.github.com` | GitHub API base URL |
| `source-branch` | Yes | - | Pull request source branch |
| `target-branch` | Yes | - | Pull request target branch |
| `title` | Yes | - | Title used only when creating a PR |
| `body` | Yes | - | Body used only when creating a PR |

## Outputs

| Output | Default | Description |
|---|---|---|
| `pull-request-url` | - | URL of the existing or new PR |

## Input example

```yaml
- id: pr
  uses: Sunnymoon724/kozae-forge/actions/ensure-pull-request@main
  with:
    token: ${{ github.token }}
    repository: ${{ github.repository }}
    api-url: ${{ github.api_url }}
    source-branch: feature/example
    target-branch: main
    title: Merge feature/example into main
    body: Created after a merge conflict.
```

## Output example

```yaml
pull-request-url: https://github.com/owner/repository/pull/1
```
