# Repository mirroring

Synchronize the latest file state of the source repository's `main` branch to a destination repository while applying an exclusion list. The destination is intended to work like a public drive that shows the latest state, not as a copy of the source Git history.

## 1. Process

The workflow shallow-clones the destination repository, synchronizes the latest files and the LFS objects used by `main`, deletes destination-only files outside the exclusion list, and commits and pushes only when files changed.

## 2. Usage

### Token registration

Add a `DESTINATION_REPO_TOKEN` Actions secret to the source repository.

The token must have push access to the destination repository.

```text
Settings → Secrets and variables → Actions
```

Secret name:

```text
DESTINATION_REPO_TOKEN
```

Pass this Secret to the reusable Workflow from the calling repository:

```yaml
secrets:
  DESTINATION_REPO_TOKEN: ${{ secrets.DESTINATION_REPO_TOKEN }}
```

### Exclusion list

Create an exclusion list file in the source repository.

```text
Sources/mirror-exclude.list
```

Add one file or folder to exclude from the public copy per line.

Format:

```text
path/to/excluded-directory/
path/to/private-file.ext
*.local
```

### Destination repository

Set the destination repository in `OWNER/DESTINATION-REPOSITORY` format.

Format:

```text
OWNER/DESTINATION-REPOSITORY
```

### Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `runner` | No | `ubuntu-latest` | Runner label used for the mirror job |
| `destination-repository` | Yes | - | Destination repository in `OWNER/REPOSITORY` format |
| `exclude-file` | Yes | - | Path to the exclusion list in the source repository |

### Workflow configuration

Create `.github/workflows/mirror-repository.yml` in the source repository:

```yaml
name: Mirror repository

on:
  push:
    branches:
      - main

jobs:
  mirror:
    uses: Sunnymoon724/kozae-forge/.github/workflows/mirror-repository.yml@main
    with:
      runner: self-hosted
      destination-repository: OWNER/DESTINATION-REPOSITORY
      exclude-file: Sources/mirror-exclude.list
    secrets:
      DESTINATION_REPO_TOKEN: ${{ secrets.DESTINATION_REPO_TOKEN }}
```

The Workflow passes `DESTINATION_REPO_TOKEN` to the Actions that access the destination repository. `configure-lfs-remote` only configures the remote URL; `upload-git-lfs-objects` and `push-changes` receive the token through their `token` input. The destination's Git history is not cloned, and only LFS objects used by `main` are uploaded.

For self-hosted Runner reliability, Git LFS uploads run up to five transfers at a time and retry each object up to three times by default.
GitHub authentication is scoped to `github.com`; the presigned S3 upload URLs do not receive the GitHub authorization header.

```yaml
- uses: Sunnymoon724/kozae-forge/actions/configure-lfs-remote@main
  with:
    repository-directory: .
    repository: OWNER/REPOSITORY

- uses: Sunnymoon724/kozae-forge/actions/push-changes@main
  with:
    token: ${{ secrets.DESTINATION_REPO_TOKEN }}
    destination-directory: destination-repo
    branch: main
```

## 3. Actions used

- `verify-repository`
- `configure-lfs-remote`
- `upload-git-lfs-objects`
- `copy-folder`
- `commit-changes`
- `push-changes`
