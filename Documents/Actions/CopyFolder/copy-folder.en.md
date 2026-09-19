# copy-folder

Copies the contents of one folder to another folder.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `source-folder` | Yes | - | Path to the source folder |
| `destination-folder` | Yes | - | Destination folder |
| `delete-extra` | No | `false` | Delete destination files that are not present in the source folder |

## Example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/copy-folder@main
  with:
    source-folder: generated-content
    destination-folder: Chronicle/blog
    delete-extra: false
```
