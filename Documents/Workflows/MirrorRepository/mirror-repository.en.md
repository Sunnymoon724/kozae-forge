# Repository mirroring

Synchronize changes from one repository to a destination repository while applying an exclusion list.

## 1. Process

The workflow checks the destination repository, clones it, uploads Git LFS objects, synchronizes files using the exclusion list, then commits and pushes the changes.

## 2. Usage

### Token setup

Add a `PUBLIC_REPO_TOKEN` Actions secret to the source repository.

The token must have push access to the destination repository.

```text
Settings → Secrets and variables → Actions
```

Secret name:

```text
PUBLIC_REPO_TOKEN
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

### Add the workflow

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
      destination-repository: OWNER/DESTINATION-REPOSITORY
      exclude-file: Sources/mirror-exclude.list
    secrets:
      PUBLIC_REPO_TOKEN: ${{ secrets.PUBLIC_REPO_TOKEN }}
```

## 3. Actions used

- `verify-repository`
- `upload-lfs`
- `sync-files`
- `commit-changes`
- `push-changes`
