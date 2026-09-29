# Publish Notion database entry

A reusable GitHub Actions Workflow that creates a Notion database entry when absent, or updates its properties and replaces its content when present.

Temporary Notion API rate-limit and server errors are retried with a short backoff. Create requests are not automatically retried to avoid duplicate entries.

## 1. Process

1. Check out the calling repository and resolve the data source from the database URL, unless a previously resolved `data-source-id` is provided.
2. Find an active entry by its title, inferring the title property when omitted.
3. Create the entry when it is absent.
4. Otherwise, update its properties, clear its blocks, and append the content.
5. When `content-format` is `markdown`, convert headings, lists, checkboxes, dividers, and links into Notion blocks.
5. When `image-files` is provided, upload the PNG/GIF files and append image blocks as well.

## 2. Usage

### Token registration

Register a Notion integration token as an Actions secret named `NOTION_TOKEN`.

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
| `runner-labels` | No | Empty | JSON array of runner labels, for example `["self-hosted", "Windows", "X64"]` |
| `content-file` | Conditional | Empty | Repository-relative content file path; use this or `content` |
| `content` | Conditional | Empty | Inline content; use this or `content-file` |
| `content-format` | No | `plain` | Use `markdown` to create headings, lists, checkboxes, dividers, and links as Notion blocks |
| `source-url` | No | Empty | Notion database URL; required when `data-source-id` is empty |
| `data-source-id` | No | Empty | Previously resolved data source ID; skips the URL lookup when provided |
| `title-property` | No | Empty | Database title property name; inferred from the data source when omitted |
| `title` | Yes | - | Entry title |
| `group-property` | No | Empty | Select property name |
| `group-value` | No | Empty | Select property value |
| `status-property` | No | Empty | Notion Status property name |
| `status-value` | No | Empty | Notion Status value |
| `date-property` | No | Empty | Date property name |
| `date` | No | Empty | Date value |
| `image-files` | No | Empty | Newline-delimited PNG/GIF file paths |
| `image-storage` | No | `notion` | Use `notion` for direct upload or `external` for links from a deployed site |
| `image-public-base-url` | No | Empty | Public site base URL when using `external` |
| `image-public-path` | No | `/media` | Public image path when using `external` |

### Workflow configuration

```yaml
jobs:
  publish:
    uses: Sunnymoon724/kozae-forge/.github/workflows/publish-notion-database.yml@main
    with:
      runner-labels: '["self-hosted", "Windows", "X64"]'
      content-format: markdown
      content: |
        ## Weekly update
        - [ ] Review the release
      source-url: ${{ vars.NOTION_DATABASE_URL }}
      title: Weekly update
      status-property: Status
      status-value: In progress
      date-property: Published
      date: 2026-09-15
      image-files: |
        output/chart.png
        output/preview.gif
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
- `upload-notion-file`
