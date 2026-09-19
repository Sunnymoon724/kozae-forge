# map-document-targets

Maps selected Markdown source files to destination paths and templates.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `mapping-file` | Yes | - | JSON mapping file |
| `source-files` | Yes | - | Newline-delimited Markdown source files |

## Outputs

| Output | Default | Description |
|---|---|---|
| `matrix` | - | Matrix containing `source`, `target`, and `template` |
| `has-sources` | - | Whether at least one target was mapped |

## Input example

```yaml
- id: targets
  uses: Sunnymoon724/kozae-forge/actions/map-document-targets@main
  with:
    mapping-file: .github/chronicle-map.json
    source-files: docs/architecture/overview.md
```

## Output example

```yaml
has-sources: true
matrix: '{"include":[{"source":"docs/architecture/overview.md","target":"Chronicle/docs/architecture/overview.md"}]}'
```
