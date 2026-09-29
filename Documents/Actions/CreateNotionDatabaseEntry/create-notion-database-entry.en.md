# create-notion-database-entry

Creates one Notion database entry with its initial properties and content.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `data-source-id` | Yes | - | Notion data source ID |
| `title-property` | Yes | - | Title property name |
| `title` | Yes | - | Entry title |
| `group-property` | No | Empty | Optional Select property name |
| `group-value` | No | Empty | Optional Select property value |
| `status-property` | No | Empty | Optional Notion Status property name |
| `status-value` | No | Empty | Optional Notion Status value |
| `date-property` | No | Empty | Date property name |
| `date` | No | Empty | Date value |
| `content-file` | Yes | - | Content file |
| `content-format` | No | `plain` | Use `markdown` to create structured Notion blocks |
| `image-file-uploads` | No | `[]` | JSON array of Notion file upload IDs |
| `notion-token` | Yes | - | Notion integration token |

## Outputs

| Output | Default | Description |
|---|---|---|
| `page-id` | - | Created database page ID |

## Input example

```yaml
- id: page
  uses: Sunnymoon724/kozae-forge/actions/create-notion-database-entry@main
  with:
    data-source-id: ${{ vars.NOTION_DATA_SOURCE_ID }}
    title-property: Name
    title: Weekly update
    group-property: Category
    group-value: Engineering
    status-property: Status
    status-value: In progress
    content-format: markdown
    content-file: output/article.md
    notion-token: ${{ secrets.NOTION_TOKEN }}
```

## Output example

```yaml
page-id: 12345678-1234-1234-1234-123456789abc
```
