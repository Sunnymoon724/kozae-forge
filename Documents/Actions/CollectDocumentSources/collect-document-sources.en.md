# collect-document-sources

Collects Markdown source files from mapped directories or a Git change range.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `mapping-file` | Yes | - | JSON mapping file |
| `sync-mode` | Yes | - | `changed` or `full` |
| `changed-files` | No | Empty | Changed-file list |
| `base-ref` | Conditional | Empty | Comparison base |
| `head-ref` | No | `HEAD` | Comparison head |

## Outputs

| Output | Default | Description |
|---|---|---|
| `source-files` | - | Newline-delimited Markdown file paths |
