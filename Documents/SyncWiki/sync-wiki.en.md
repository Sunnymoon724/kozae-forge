# Wiki synchronization

GitHub Wikis are separate Git repositories from the main repositories. This action synchronizes one repository's Wiki to another repository's Wiki.

```text
SOURCE.wiki.git → DESTINATION.wiki.git
```

## 🧭 Table of contents

- [Usage](#usage)

## 🚀 Usage

### 1. Token setup

Prepare a token that can read the source Wiki and push to the destination Wiki.

Add the following secret to the source workflow repository:

```text
WIKI_SYNC_TOKEN
```

### 2. Source Wiki

Set the source repository in `OWNER/SOURCE-REPOSITORY` format.

```text
OWNER/SOURCE-REPOSITORY
```

### 3. Destination Wiki

Set the destination repository in `OWNER/DESTINATION-REPOSITORY` format.

```text
OWNER/DESTINATION-REPOSITORY
```

Wiki must be enabled in both the source and destination repositories.

### 4. Add the Action

Add the following Action to a workflow:

```yaml
- name: Sync Wiki
  uses: Sunnymoon724/kozae-forge/actions/sync-wiki@main
  with:
    token: ${{ secrets.WIKI_SYNC_TOKEN }}
    source-repository: OWNER/SOURCE-REPOSITORY
    destination-repository: OWNER/DESTINATION-REPOSITORY
```
