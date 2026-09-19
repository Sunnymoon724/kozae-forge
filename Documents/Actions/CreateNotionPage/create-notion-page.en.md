# create-notion-page

Creates one Notion page from a content file.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `content-file` | Yes | - | Content file |
| `parent-page-id` | Yes | - | Parent page ID |
| `title` | Yes | - | Page title |
| `notion-token` | Yes | - | Notion integration token |

## Outputs

| Output | Default | Description |
|---|---|---|
| `page-id` | - | Created page ID |

## Input example

```yaml
- id: page
  uses: Sunnymoon724/kozae-forge/actions/create-notion-page@main
  with:
    content-file: output/article.md
    parent-page-id: ${{ vars.NOTION_PARENT_PAGE_ID }}
    title: Weekly update
    notion-token: ${{ secrets.NOTION_TOKEN }}
```

## Output example

```yaml
page-id: 12345678-1234-1234-1234-123456789abc
```
