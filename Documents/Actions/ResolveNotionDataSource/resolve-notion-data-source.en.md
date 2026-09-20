# resolve-notion-data-source

Resolves a Notion database URL to its data source ID.

Hyphenated input names such as `source-url` and `notion-token` are normalized before the URL is parsed or the Notion API is called.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `source-url` | Yes | - | Notion database URL |
| `notion-token` | Yes | - | Notion integration token |

## Outputs

| Output | Default | Description |
|---|---|---|
| `data-source-id` | - | Resolved data source ID |

## Input example

```yaml
- id: data-source
  uses: Sunnymoon724/kozae-forge/actions/resolve-notion-data-source@main
  with:
    source-url: ${{ vars.NOTION_DATABASE_URL }}
    notion-token: ${{ secrets.NOTION_TOKEN }}
```

## Output example

```yaml
data-source-id: 12345678-1234-1234-1234-123456789abc
```
