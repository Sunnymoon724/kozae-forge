# append-notion-page-content

Appends plain text or structured Markdown blocks and optional image blocks to an existing Notion page.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `content-file` | Yes | - | Content file path |
| `content-format` | No | `plain` | Use `markdown` to create headings, lists, checkboxes, dividers, and links as Notion blocks |
| `page-id` | Yes | - | Existing Notion page ID |
| `notion-token` | Yes | - | Notion integration token |
| `image-file-uploads` | No | `[]` | JSON array of Notion file upload IDs |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/append-notion-page-content@main
  with:
    content-file: output/article.md
    page-id: ${{ vars.NOTION_PAGE_ID }}
    notion-token: ${{ secrets.NOTION_TOKEN }}
```
