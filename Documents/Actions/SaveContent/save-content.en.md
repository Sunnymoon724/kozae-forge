# save-content

Saves either inline content or one existing file to a target path.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `file-path` | Yes | - | Target file path |
| `content` | No | Empty | Inline content to save |
| `source-file` | No | Empty | Existing file to copy |

Provide exactly one of `content` or `source-file`.

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/save-content@main
  with:
    file-path: Chronicle/blog/article.md
    source-file: generated-content/article.md
```
