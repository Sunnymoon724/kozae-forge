# notify-webhook

Sends an HTTP request to a notification webhook.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `url` | Yes | - | Webhook URL |
| `method` | No | `POST` | HTTP method |
| `headers` | No | `{"Content-Type":"application/json"}` | JSON object containing HTTP headers |
| `body` | Yes | - | HTTP request body |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/notify-webhook@main
  with:
    url: ${{ secrets.NOTIFY_WEBHOOK_URL }}
    headers: '{"Content-Type":"application/json"}'
    body: '{"message":"Build completed"}'
```
