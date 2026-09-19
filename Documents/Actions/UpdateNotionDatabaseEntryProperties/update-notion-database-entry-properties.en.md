# update-notion-database-entry-properties

Updates grouping and optional date properties of an existing Notion database entry.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `page-id` | Yes | - | Existing database page ID |
| `group-property` | Yes | - | Select property name |
| `group-value` | Yes | - | Select property value |
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
