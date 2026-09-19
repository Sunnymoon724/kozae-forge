# Prepare content

Combines inline content with optional source and template files.

Provide only `source-file` to read a file without modifying its content.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `content` | No | Empty | Inline content |
| `source-file` | No | Empty | File whose content replaces inline content |
| `template-file` | No | Empty | Template file appended to the content |

## Outputs

| Output | Description |
|---|---|
| `content` | Prepared content |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/prepare-content@main
  with:
    source-file: source.md
```

## Output example

```yaml
content: Prepared source content
```
