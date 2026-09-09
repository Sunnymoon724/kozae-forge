# publish-notion

A GitHub Action that creates a new Notion page under a parent page from a content file.

## Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `content-file` | Yes | - | Content file to upload |
| `parent-page-id` | Yes | - | Notion parent page ID |
| `title` | Yes | - | New Notion page title |
| `notion-token` | Yes | - | Notion integration token |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/publish-notion@main
  with:
    content-file: generated.md
    parent-page-id: ${{ secrets.NOTION_PARENT_PAGE_ID }}
    title: 2026-09-09 development log
    notion-token: ${{ secrets.NOTION_TOKEN }}
```

## Prerequisite

Create a Notion integration and share the target parent page with that integration.
