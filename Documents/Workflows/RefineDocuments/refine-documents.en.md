# Refine documents

## 1. Process

1. Check out the calling repository.
2. `map-document-sources` connects source and destination documents according to the mapping file and synchronization mode.
3. `generate-content` rewrites each document from the source and template.
4. Upload generated Chronicle pages to per-document artifacts.
5. Combine the uploaded pages into the `refined-documents` artifact.

This workflow does not directly save files or publish them externally.

Set `sync-mode` to `changed` (changed documents) or `full` (all documents).

## 2. Usage

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

### Call the workflow

Call the reusable workflow from an external workflow. `sync-mode` is required, and `base-ref` must also be provided when using `changed`.

```yaml
jobs:
  sync:
    uses: Sunnymoon724/kozae-forge/.github/workflows/refine-documents.yml@main
    with:
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

When run with `full`, all documents are processed. The result files are available as `refined-documents`.

## 3. Actions used

- `actions/checkout`
- `map-document-sources`
- `generate-content`
- `actions/upload-artifact`
- `actions/download-artifact`
