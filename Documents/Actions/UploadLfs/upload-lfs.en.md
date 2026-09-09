# upload-lfs

A GitHub Action that uploads Git LFS objects to a destination GitHub repository.

## Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `token` | Yes | - | GitHub token for the destination repository |
| `repository` | Yes | - | Destination repository in `owner/name` format |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/upload-lfs@main
  with:
    token: ${{ secrets.PUBLIC_REPO_TOKEN }}
    repository: OWNER/DESTINATION-REPOSITORY
```
