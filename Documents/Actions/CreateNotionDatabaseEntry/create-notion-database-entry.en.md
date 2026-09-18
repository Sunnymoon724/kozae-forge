# create-notion-database-entry

Creates one Notion database entry with its initial properties and content.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `data-source-id` | Yes | - | Notion data source ID |
| `title-property` | Yes | - | Title property name |
| `title` | Yes | - | Entry title |
| `group-property` | Yes | - | Select property name |
| `group-value` | Yes | - | Select property value |
| `date-property` | No | Empty | Date property name |
| `date` | No | Empty | Date value |
| `content-file` | Yes | - | Content file |
| `notion-token` | Yes | - | Notion integration token |

## Outputs

| Output | Default | Description |
|---|---|---|
| `page-id` | - | Created database page ID |
