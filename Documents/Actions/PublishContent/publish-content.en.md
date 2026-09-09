# publish-content

A GitHub Action that uploads a generated content file to an external webhook.

## Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `file-name` | Yes | - | Content file to upload |
| `publish-url` | Yes | - | External webhook URL |

## Payload

```json
{
  "date": "2026-09-09",
  "content": "File content"
}
```

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/publish-content@main
  with:
    file-name: generated.md
    publish-url: https://example.com/webhook
```
