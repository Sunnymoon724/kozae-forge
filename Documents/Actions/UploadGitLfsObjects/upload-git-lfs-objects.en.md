# upload-git-lfs-objects

Uploads all Git LFS objects for one branch through an already configured remote. Use `configure-lfs-remote` first.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `repository-directory` | Yes | - | Git repository directory |
| `remote-name` | No | `public` | Configured remote name |
| `branch` | No | `main` | Branch to upload |
