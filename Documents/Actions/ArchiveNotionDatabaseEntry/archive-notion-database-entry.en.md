# archive-notion-database-entry

Archives a Notion database page so it is no longer shown as an active entry.

## Inputs

| Input | Required | Description |
|---|---:|---|
| `page-id` | Yes | Notion page ID |
| `notion-token` | Yes | Notion integration token |

```yaml
- uses: Sunnymoon724/kozae-forge/actions/archive-notion-database-entry@main
  with:
    page-id: ${{ steps.entry.outputs.page-id }}
    notion-token: ${{ secrets.NOTION_TOKEN }}
```
