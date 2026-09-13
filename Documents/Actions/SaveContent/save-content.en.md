# save-content

Saves a provided Markdown content file to a specified path. This Action does not download artifacts, commit, or push changes.

## Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `source-file` | Yes | - | Path to the source Markdown file |
| `output-file` | Yes | - | Destination path for the content file |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/save-content@main
  with:
    source-file: generated-content/2026-09-08-development-log.md
    output-file: Documents/Blog/2026-09-08-development-log.md
```
