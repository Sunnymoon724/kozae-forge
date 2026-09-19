# clear-notion-page

Archives every child block of a Notion page.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `page-id` | Yes | - | Notion page ID |
| `notion-token` | Yes | - | Notion integration token |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/clear-notion-page@main
  with:
    page-id: ${{ vars.NOTION_PAGE_ID }}
    notion-token: ${{ secrets.NOTION_TOKEN }}
```
