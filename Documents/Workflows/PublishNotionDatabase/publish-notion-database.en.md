# Publish Notion database entry

A reusable GitHub Actions Workflow that creates a Notion database entry when absent, or updates its properties and replaces its content when present.

## 1. Process

1. Check out the calling repository and resolve the data source from the database URL.
2. Find an active entry by its title.
3. Create the entry when it is absent.
4. Otherwise, update its properties, clear its blocks, and append the content file.

## 2. Usage

### Token registration

Register a Notion integration token as an Actions secret named `NOTION_TOKEN`.

### Input configuration

| Input | Required | Default | Description |
|---|---:|---|---|
| `content-file` | Yes | - | Repository-relative content file path |
| `source-url` | Yes | - | Notion database URL |
| `title-property` | Yes | - | Database title property name |
| `title` | Yes | - | Entry title |
| `group-property` | Yes | - | Select property name |
| `group-value` | Yes | - | Select property value |
| `date-property` | No | Empty | Date property name |
| `date` | No | Empty | Date value |

### Workflow configuration

```yaml
jobs:
  publish:
    uses: Sunnymoon724/kozae-forge/.github/workflows/publish-notion-database.yml@main
    with:
      content-file: output/article.md
      source-url: ${{ vars.NOTION_DATABASE_URL }}
      title-property: Name
      title: Weekly update
      group-property: Category
      group-value: Engineering
      date-property: Published
      date: 2026-09-15
    secrets:
      notion-token: ${{ secrets.NOTION_TOKEN }}
```

## 3. Actions used

- `resolve-notion-data-source`
- `find-notion-database-entry`
- `create-notion-database-entry`
- `update-notion-database-entry-properties`
- `clear-notion-page`
- `append-notion-page-content`
