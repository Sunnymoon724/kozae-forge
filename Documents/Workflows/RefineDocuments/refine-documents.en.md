# Refine documents

## 1. Process

1. Check out the calling repository.
2. `collect-document-sources` collects source documents according to the mapping file and synchronization mode.
3. `map-document-targets` connects the selected source and destination documents.
4. `prepare-content`, `validate-content-size`, `request-content`, and `save-content` rewrite each document from the source and template.
5. Upload generated Chronicle pages to per-document artifacts.
6. Combine the uploaded pages into the `refined-documents` artifact.

This workflow does not directly save files or publish them externally.

Set `sync-mode` to `changed` (changed documents) or `full` (all documents).

## 2. Usage

### Token registration

Register the `api-key` secret required by the AI provider.

```text
Settings → Secrets and variables → Actions
```

Secret name:

```text
AI_API_KEY
```

### Input configuration

| Input | Required | Default | Description |
|---|---:|---|---|
| `runner` | No | `ubuntu-latest` | Runner label used for workflow jobs |
| `mapping-file` | Yes | - | JSON mapping file |
| `sync-mode` | Yes | - | `changed` or `full` |
| `base-ref` | No | Empty | Comparison base for `changed` mode |
| `head-ref` | No | Empty | Comparison head |
| `max-content-bytes` | Yes | - | Maximum input content size |
| `provider` | Yes | - | AI provider |
| `api-base` | Yes | - | AI API base URL |
| `model` | Yes | - | AI model |

### Prepare the mapping file

Add a JSON mapping file to the calling repository that connects source and destination directories. Set `defaultTemplate` for one template, or add `templateRules` for path-specific templates.

```json
{
  "mappings": [
    {
      "source": "docs/architecture",
      "destination": "Chronicle/docs/architecture",
      "template": "Chronicle/templates/architecture.md"
    }
  ]
}
```

### Workflow configuration

Call the reusable workflow from an external workflow. `sync-mode` is required, and `base-ref` must also be provided when using `changed`.

```yaml
jobs:
  sync:
    uses: Sunnymoon724/kozae-forge/.github/workflows/refine-documents.yml@main
    with:
      runner: self-hosted
      mapping-file: .github/chronicle-map.json
      sync-mode: changed
      base-ref: ${{ github.event.before }}
      max-content-bytes: 100000
      provider: openai
      api-base: https://api.openai.com/v1
      model: gpt-4o-mini
    secrets:
      api-key: ${{ secrets.AI_API_KEY }}
```

When run with `full`, all documents are processed. The result files are available as `refined-documents`. When no documents are selected, no artifact is created, so downstream jobs must run only when `needs.sync.outputs.has-sources == 'true'`.

```yaml
  download:
    needs: sync
    if: needs.sync.outputs.has-sources == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: ${{ needs.sync.outputs.artifact-name }}
```

## 3. Actions used

- `actions/checkout`
- `collect-document-sources`
- `map-document-targets`
- `prepare-content`
- `validate-content-size`
- `request-content`
- `save-content`
- `copy-file`
- `actions/upload-artifact`
- `actions/download-artifact`
