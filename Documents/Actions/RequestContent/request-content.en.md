# Request content

Requests generated content from an OpenAI-compatible API. OpenAI-compatible providers are asked to return the result without a reasoning phase.

The Action validates every required input before sending the request and reports the missing input name when validation fails.

When `max-content-bytes` is set and the input exceeds it, the Action splits the input into UTF-8-safe chunks, summarizes each chunk, and uses the combined notes to generate one final result. If the notes still exceed the limit, it summarizes them again. Without this input, the original single-request behavior is unchanged. Chunking adds API calls and can lose detail in the intermediate summaries.

## Inputs

| Input | Required | Description |
|---|---:|---|
| `provider` | Yes | AI provider name |
| `api-base` | Yes | OpenAI-compatible API base URL |
| `model` | Yes | AI model name |
| `prompt` | Yes | Generation instructions |
| `content` | Yes | Input content |
| `api-key` | Yes | AI provider API key |
| `max-content-bytes` | No | UTF-8 byte limit per AI request; `0` disables chunking |

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
    max-content-bytes: 12000
```

## Output example

```yaml
content: Generated Markdown content
```
