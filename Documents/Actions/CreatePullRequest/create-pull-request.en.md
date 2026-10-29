# create-pull-request

A GitHub Action that creates or reuses a pull request for an already pushed branch.

Commit and push workspace changes first with `commit-pull-request-changes` and `push-pull-request-branch`. Add labels separately with `label-pull-request`.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `token` | Yes | - | GitHub token used to create the pull request |
| `branch` | No | `automation/update-content` | Branch used for the pull request |
| `title` | No | `docs: update generated content` | Pull request title |
| `body` | No | Generated content review message | Pull request body |

## Outputs

| Output | Description |
|---|---|
| `pull-request-number` | Created or reused pull request number |
| `pull-request-url` | Created or reused pull request URL |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/create-pull-request@main
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    branch: automation/sync-wiki
    title: 'docs: sync wiki pages'
    body: |
      This pull request contains generated Chronicle pages.
```

## Output example

```yaml
pull-request-number: '42'
pull-request-url: https://github.com/owner/repository/pull/42
```
