# Repository mirroring

Synchronize changes from one repository to a destination repository while applying an exclusion list.

## 🧭 Table of contents

- [Usage](#usage)

## Usage

### 1. Token setup

Add a `PUBLIC_REPO_TOKEN` Actions secret to the source repository.

The token must have push access to the destination repository.

```text
Settings → Secrets and variables → Actions
```

Secret name:

```text
PUBLIC_REPO_TOKEN
```

### 2. Exclusion list

Create an exclusion list file in the source repository.

```text
Sources/public-exclude.list
```

Add one file or folder to exclude from the public copy per line.

Format:

```text
path/to/excluded-directory/
path/to/private-file.ext
*.local
```

### 3. Destination repository

Set the destination repository in `OWNER/DESTINATION-REPOSITORY` format.

Format:

```text
OWNER/DESTINATION-REPOSITORY
```

### 4. Add the workflow

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
      exclude-file: Sources/public-exclude.list
    secrets:
      PUBLIC_REPO_TOKEN: ${{ secrets.PUBLIC_REPO_TOKEN }}
```
