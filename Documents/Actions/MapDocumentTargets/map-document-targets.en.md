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
