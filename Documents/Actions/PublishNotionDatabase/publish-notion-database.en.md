# publish-notion-database

A GitHub Action that updates a matching database entry or creates one when it does not exist.

## Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `content-file` | Yes | - | Content file to upload |
| `data-source-id` | Yes | - | Notion database ID or Data Source ID |
| `title-property` | Yes | - | Database title property name |
| `title` | Yes | - | Entry title to find or create |
| `group-property` | Yes | - | Database property used for grouping |
| `group-value` | Yes | - | Group value assigned to that property |
| `date-property` | No | Empty | Date property name |
| `date` | No | Empty | Date to save in `YYYY-MM-DD` format |
| `notion-token` | Yes | - | Notion Integration Token |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/publish-notion-database@main
  with:
    content-file: generated.md
    data-source-id: ${{ secrets.NOTION_DATA_SOURCE_ID }}
    title-property: Name
    title: 2026-09-09
    group-property: Status
    group-value: Daily report
    date-property: Date
    date: 2026-09-09
    notion-token: ${{ secrets.NOTION_TOKEN }}
```
