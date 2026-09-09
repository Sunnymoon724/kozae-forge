# push-changes

A GitHub Action that pushes committed changes to a remote branch.

## Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `destination-directory` | No | `public-repo` | Git repository directory |
| `branch` | No | `main` | Remote branch to push |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/push-changes@main
  with:
    destination-directory: destination-repo
    branch: main
```
