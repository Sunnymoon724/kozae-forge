# copy-file

A GitHub Action that copies an existing file to a target path.

## Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `source-file` | Yes | - | Source file to copy |
| `file-path` | Yes | - | Destination path |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/copy-file@main
  with:
    source-file: generated.md
    file-path: Documents/Blog/article.md
```
