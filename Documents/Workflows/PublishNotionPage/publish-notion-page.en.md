# Publish Notion page

A reusable GitHub Actions Workflow that creates a Notion page when no matching page exists, or replaces the content of a matching page.

## 1. Process

1. Check out the calling repository.
2. Find a page by its parent page and title.
3. Create the page with the content file when it is absent.
4. Otherwise, clear its blocks and append the content file.

## 2. Usage

### Token registration

Register a Notion integration token as an Actions secret.

```text
Settings → Secrets and variables → Actions
```

Secret name:

```text
NOTION_TOKEN
```

### Input configuration

| Input | Required | Default | Description |
|---|---:|---|---|
| `runner` | No | `ubuntu-latest` | Runner label used for the publish job |
| `content-file` | Yes | - | Repository-relative content file path |
| `parent-page-id` | Yes | - | Parent page ID for new pages |
| `title` | Yes | - | Page title |

### Workflow configuration

```yaml
jobs:
  publish:
    uses: Sunnymoon724/kozae-forge/.github/workflows/publish-notion-page.yml@main
    with:
      runner: self-hosted
      content-file: output/article.md
      parent-page-id: ${{ vars.NOTION_PARENT_PAGE_ID }}
      title: Weekly update
    secrets:
      notion-token: ${{ secrets.NOTION_TOKEN }}
```

## 3. Actions used

- `find-notion-page`
- `create-notion-page`
- `clear-notion-page`
- `append-notion-page-content`
