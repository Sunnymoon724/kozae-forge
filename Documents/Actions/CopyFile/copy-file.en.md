# copy-file

Copies one file to a destination path.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `source-file` | Yes | - | Path to the source file |
| `destination-file` | Yes | - | Destination path for the file |

## Example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/copy-file@main
  with:
    source-file: generated.md
    destination-file: Chronicle/blog/generated.md
```
