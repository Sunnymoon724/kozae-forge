# find-notion-page

Finds a Notion page by title and parent page.

## Inputs

| Input | Required | Description |
|---|---:|---|
| `title` | Yes | Page title |
| `parent-page-id` | Yes | Parent Notion page ID |
| `notion-token` | Yes | Notion integration token |

## Outputs

| Output | Description |
|---|---|
| `page-id` | Matching page ID, if found |

## Input example

```yaml
- id: page
  uses: Sunnymoon724/kozae-forge/actions/find-notion-page@main
  with:
    parent-page-id: ${{ vars.NOTION_PARENT_PAGE_ID }}
    title: Weekly update
    notion-token: ${{ secrets.NOTION_TOKEN }}
```

## Output example

```yaml
page-id: 12345678-1234-1234-1234-123456789abc
```
