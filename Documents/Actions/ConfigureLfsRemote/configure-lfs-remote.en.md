# configure-lfs-remote

Initializes Git LFS and configures a Git remote for uploads. The upload Action supplies authentication when it sends the objects.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `repository-directory` | Yes | - | Git repository directory |
| `repository` | Yes | - | Destination `owner/name` |
| `remote-name` | No | `public` | Remote name |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/configure-lfs-remote@main
  with:
    repository-directory: destination-repo
    repository: OWNER/REPOSITORY
```
