# append-notion-page-content

Appends one content file to an existing Notion page.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `content-file` | Yes | - | Content file path |
| `page-id` | Yes | - | Existing Notion page ID |
| `notion-token` | Yes | - | Notion integration token |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/append-notion-page-content@main
  with:
    content-file: output/article.md
    page-id: ${{ vars.NOTION_PAGE_ID }}
    notion-token: ${{ secrets.NOTION_TOKEN }}
```
