# Summarize files to Notion

A reusable Workflow that reads UTF-8 text files, summarizes their content with AI, and publishes one Markdown-formatted summary to a Notion database.

## 1. Process

1. Download the text-file artifact and combine the files listed in `file-names`.
2. Combine the caller's prompt and optional template.
3. Summarize the combined content once and publish one Notion entry with the caller-provided `title`.

Filenames need neither dates nor a Markdown extension. By default, rerunning creates another entry with the same title. Set `upsert: true` to update an existing entry; this mode also supports an optional Notion date property and referenced images.

## 2. Usage

### Token registration

Register the AI provider key and Notion integration token in the caller repository's Actions secrets.

```text
Settings → Secrets and variables → Actions
```

Secret names: `AI_API_KEY`, `NOTION_TOKEN`.

### Input configuration

| Input | Required | Default | Description |
|---|---:|---|---|
| `runner` | No | `ubuntu-latest` | Runner label |
| `runner-labels` | No | Empty | Optional JSON array of runner labels |
| `checkout-ref` | No | Empty | Optional caller repository ref for prompts and referenced images |
| `artifact-name` | No | `generated-content` | Artifact containing UTF-8 text files |
| `file-names` | Yes | - | JSON array of filenames in the artifact |
| `prompt-source-file` | Yes | - | AI summarization prompt in the caller repository |
| `prompt-template-file` | No | Empty | Optional prompt template file |
| `provider` | Yes | - | AI provider |
| `api-base` | Yes | - | AI API base URL |
| `model` | Yes | - | AI model |
| `notion-source-url` | Yes | - | Notion database or data source URL |
| `title-property` | Yes | - | Notion title property name |
| `title` | Yes | - | Title of the single Notion entry |
| `group-property` | No | Empty | Optional Select property name |
| `group-value` | No | Empty | Optional Select property value |
| `upsert` | No | `false` | Update an entry with the same title instead of creating a duplicate |
| `date-property` | No | Empty | Optional Notion date property; use with `date` and `upsert: true` |
| `date` | No | Empty | Optional `YYYY-MM-DD` date; use with `date-property` and `upsert: true` |
| `image-files` | No | Empty | Optional newline-delimited caller-repository image paths for `upsert: true` |
| `image-storage` | No | `notion` | `notion` or `external` when uploading images |
| `image-public-base-url` | No | Empty | Public site URL for external images |
| `image-public-path` | No | `/media` | Public directory path for external images |

### Workflow configuration

```yaml
jobs:
  publish-notion:
    uses: Sunnymoon724/kozae-forge/.github/workflows/summarize-files-to-notion.yml@main
    with:
      file-names: '["planning.txt","implementation.md"]'
      prompt-source-file: prompts/summarize.md
      provider: ${{ vars.AI_PROVIDER }}
      api-base: ${{ vars.AI_API_URL }}
      model: ${{ vars.AI_MODEL }}
      notion-source-url: ${{ vars.NOTION_REPORT_DATA_SOURCE_URL }}
      title-property: Name
      title: Sprint review
    secrets:
      API_KEY: ${{ secrets.AI_API_KEY }}
      NOTION_TOKEN: ${{ secrets.NOTION_TOKEN }}
```

## 3. Actions used

- `actions/checkout`
- `actions/download-artifact`
- `combine-text-files`
- `prepare-content`
- `request-content`
- `save-content`
- `resolve-notion-data-source`
- `create-notion-database-entry`
- `find-notion-database-entry`, `update-notion-database-entry-properties`, `clear-notion-page`, and `append-notion-page-content` when `upsert: true`
- `upload-notion-file` or `append-external-image-links` when `upsert: true` and images are supplied
