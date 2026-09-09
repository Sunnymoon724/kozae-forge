# verify-repository

A GitHub Action that verifies push access to a GitHub repository.

## Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `token` | Yes | - | GitHub token used to access the repository |
| `repository` | Yes | - | Destination repository in `owner/name` format |

The action fails when the repository cannot be accessed or the token lacks push permission.

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/verify-repository@main
  with:
    token: ${{ secrets.PUBLIC_REPO_TOKEN }}
    repository: OWNER/DESTINATION-REPOSITORY
```
