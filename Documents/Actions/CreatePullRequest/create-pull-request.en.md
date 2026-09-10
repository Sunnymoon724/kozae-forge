# create-pull-request

A GitHub Action that downloads generated content and creates a pull request with the changes.

The calling Workflow must check out the repository before using this Action.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `token` | Yes | - | GitHub token used to create the pull request |
| `artifact-name` | Yes | - | Name of the artifact containing the generated files |
| `branch` | No | `automation/update-content` | Branch used for the pull request |
| `commit-message` | No | `docs: update generated content` | Commit message |
| `title` | No | `docs: update generated content` | Pull request title |
| `body` | No | Generated content review message | Pull request body |
| `labels` | No | Empty | Comma-separated pull request labels |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/create-pull-request@main
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    artifact-name: chronicle-pages
    branch: automation/sync-wiki
    commit-message: 'docs: sync wiki pages'
    title: 'docs: sync wiki pages'
    body: |
      This pull request contains generated Chronicle pages.
    labels: documentation, automated
```
