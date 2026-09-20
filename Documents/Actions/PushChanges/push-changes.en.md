# push-changes

A GitHub Action that pushes committed changes to a remote branch.

The token is passed through Git's temporary authorization configuration, and interactive credential prompts are disabled.

## Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `token` | Yes | - | GitHub token with destination repository write access |
| `destination-directory` | No | `public-repo` | Git repository directory |
| `branch` | No | `main` | Remote branch to push |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/push-changes@main
  with:
    token: ${{ secrets.DESTINATION_REPO_TOKEN }}
    destination-directory: destination-repo
    branch: main
```
