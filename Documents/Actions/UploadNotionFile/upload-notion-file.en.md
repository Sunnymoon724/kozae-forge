# Upload Notion file

Uploads PNG or GIF files to Notion and returns their file upload IDs.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `file-paths` | Yes | - | Newline-delimited PNG or GIF paths |
| `notion-token` | Yes | - | Notion integration token |

## Outputs

| Output | Description |
|---|---|
| `file-upload-id` | First uploaded file ID |
| `file-upload-ids` | JSON array of uploaded file IDs |
