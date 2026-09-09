# publish-notion-page

A GitHub Action that updates a matching Notion page or creates one when it does not exist.

## Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `content-file` | Yes | - | Content file to upload |
| `parent-page-id` | Yes | - | Notion parent page ID |
| `title` | Yes | - | Page title to create or update |
| `notion-token` | Yes | - | Notion Integration Token |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/publish-notion-page@main
  with:
    content-file: generated.md
    parent-page-id: ${{ secrets.NOTION_PARENT_PAGE_ID }}
    title: Development log
    notion-token: ${{ secrets.NOTION_TOKEN }}
```
