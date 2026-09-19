# upload-git-lfs-objects

Uploads all Git LFS objects for one branch through an already configured remote. Use `configure-lfs-remote` first.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `token` | Yes | - | GitHub token with destination repository write access |
| `repository-directory` | Yes | - | Git repository directory |
| `remote-name` | No | `public` | Configured remote name |
| `branch` | No | `main` | Branch to upload |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/upload-git-lfs-objects@main
  with:
    token: ${{ secrets.PUBLIC_REPO_TOKEN }}
    repository-directory: .
    remote-name: public
    branch: main
```
