# upload-git-lfs-objects

Uploads all Git LFS objects for one branch through an already configured remote. Use `configure-lfs-remote` first.

The token is passed through Git's temporary authorization configuration, and interactive credential prompts are disabled.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `token` | Yes | - | GitHub token with destination repository write access |
| `repository-directory` | Yes | - | Git repository directory |
| `remote-name` | No | `public` | Configured remote name |
| `branch` | No | `main` | Branch to upload |
| `concurrent-transfers` | No | `1` | Maximum simultaneous LFS uploads |
| `max-retries` | No | `12` | Maximum retries for each LFS object |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/upload-git-lfs-objects@main
  with:
    token: ${{ secrets.DESTINATION_REPO_TOKEN }}
    repository-directory: .
    remote-name: public
    branch: main
    concurrent-transfers: 1
    max-retries: 12
```
