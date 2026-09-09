# write-content

A GitHub Action that writes the input `content` to a file at the specified path.

## Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `file-path` | Yes | - | Target file path |
| `content` | No | Empty | Text to write directly |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/write-content@main
  with:
    file-path: Documents/Blog/article.md
    content: '# Today'
```
