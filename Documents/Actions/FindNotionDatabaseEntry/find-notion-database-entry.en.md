# find-notion-database-entry

Finds one active Notion database entry by title.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `data-source-id` | Yes | - | Notion data source ID |
| `title-property` | Yes | - | Title property name |
| `title` | Yes | - | Entry title |
| `notion-token` | Yes | - | Notion integration token |

## Outputs

| Output | Default | Description |
|---|---|---|
| `page-id` | Empty | Matching page ID |

## Input example

```yaml
- id: page
  uses: Sunnymoon724/kozae-forge/actions/find-notion-database-entry@main
  with:
    data-source-id: ${{ vars.NOTION_DATA_SOURCE_ID }}
    title-property: Name
    title: Weekly update
    notion-token: ${{ secrets.NOTION_TOKEN }}
```

## Output example

```yaml
page-id: 12345678-1234-1234-1234-123456789abc
```
