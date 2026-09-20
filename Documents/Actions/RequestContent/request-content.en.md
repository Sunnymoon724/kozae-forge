# Request content

Requests generated content from an OpenAI-compatible API.

The Action validates every required input before sending the request and reports the missing input name when validation fails.

## Inputs

| Input | Required | Description |
|---|---:|---|
| `provider` | Yes | AI provider name |
| `api-base` | Yes | OpenAI-compatible API base URL |
| `model` | Yes | AI model name |
| `prompt` | Yes | Generation instructions |
| `content` | Yes | Input content |
| `api-key` | Yes | AI provider API key |

## Outputs

| Output | Description |
|---|---|
| `content` | Generated content |

## Input example

```yaml
- id: generated
  uses: Sunnymoon724/kozae-forge/actions/request-content@main
  with:
    provider: openai
    api-base: https://api.openai.com/v1
    model: gpt-4o-mini
    prompt: Write a Markdown summary.
    content: Source content
    api-key: ${{ secrets.API_KEY }}
```

## Output example

```yaml
content: Generated Markdown content
```
