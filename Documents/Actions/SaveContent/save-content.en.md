# save-content

Downloads an artifact and saves its Markdown content to the specified directory. This Action does not commit or push changes.

## Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `artifact-name` | No | `generated-content` | Artifact containing the content to save |
| `file-directory` | No | `Documents/Blog` | Directory where the content file will be saved |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/save-content@main
  with:
    artifact-name: generated-content
    file-directory: Documents/Blog
```
