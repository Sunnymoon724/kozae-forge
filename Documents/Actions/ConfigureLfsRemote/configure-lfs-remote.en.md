# configure-lfs-remote

Initializes Git LFS and configures an authenticated Git remote for uploads.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `repository-directory` | Yes | - | Git repository directory |
| `token` | Yes | - | Destination GitHub token |
| `repository` | Yes | - | Destination `owner/name` |
| `remote-name` | No | `public` | Remote name |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/configure-lfs-remote@main
  with:
    repository-directory: destination-repo
    token: ${{ secrets.PUBLIC_REPO_TOKEN }}
    repository: OWNER/REPOSITORY
```
