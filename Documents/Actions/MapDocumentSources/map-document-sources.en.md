# map-document-sources

A GitHub Action that maps source documents to their destination paths and templates.

## Mapping file

`mapping-file` points to a JSON file in this format:

The directory structure and file names under `source` are preserved under `destination`.

## Inputs

| Name | Required | Default | Description |
|---|---:|---|---|
| `mapping-file` | Yes | - | JSON mapping file |
| `sync-mode` | Yes | - | `changed` or `full` |
| `changed-files` | No | Empty | Changed-file list |
| `base-ref` | Conditional | Empty | Comparison base |
| `head-ref` | No | `HEAD` | Comparison head |

`full` processes all source documents. `changed` processes changed documents only. When `changed-files` is not provided, the action compares `base-ref` and `head-ref`.

## Outputs

| Output | Description |
|---|---|
| `matrix` | GitHub Actions matrix JSON containing `source`, `target`, and `template` |
| `has-sources` | `true` when at least one document was found |

## Example

```yaml
- id: sources
  uses: Sunnymoon724/kozae-forge/actions/map-document-sources@main
  with:
    mapping-file: .github/chronicle-map.json
    sync-mode: changed
    base-ref: ${{ github.event.before }}
```

Use `matrix` in a downstream job with `fromJSON`.

```yaml
strategy:
  matrix: ${{ fromJSON(needs.discover.outputs.matrix) }}
```
