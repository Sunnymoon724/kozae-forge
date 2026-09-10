# sync-files

A GitHub Action that synchronizes files with `rsync` while applying an exclusion list.

## Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `exclude-file` | Yes | - | Exclusion list path |
| `destination-directory` | Yes | - | Directory receiving synchronized files |

`.git`, `destination-repo`, and the mirror workflow are excluded by default. Because the action uses `rsync --delete`, files that exist only in the destination may be deleted.

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/sync-files@main
  with:
    exclude-file: Sources/mirror-exclude.list
    destination-directory: destination-repo
```
