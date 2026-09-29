# update-notion-database-entry-properties

Updates optional Select, Status, and date properties of an existing Notion database entry.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `page-id` | Yes | - | Existing database page ID |
| `title-property` | No | Empty | Title property name |
| `title` | No | Empty | New title value |
| `group-property` | No | Empty | Optional Select property name |
| `group-value` | No | Empty | Optional Select property value |
| `status-property` | No | Empty | Optional Status property name |
| `status-value` | No | Empty | Optional Status property value |
| `date-property` | No | Empty | Date property name |
| `date` | No | Empty | Date value |
| `notion-token` | Yes | - | Notion integration token |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/update-notion-database-entry-properties@main
  with:
    page-id: ${{ steps.page.outputs.page-id }}
    group-property: Category
    group-value: Engineering
    date-property: Published
    date: 2026-09-19
    notion-token: ${{ secrets.NOTION_TOKEN }}
```
