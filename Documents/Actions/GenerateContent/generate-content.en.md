# generate-content

A GitHub Action that sends input text to an OpenAI-compatible Chat Completions API and generates content in the requested format.

## Inputs

| Name | Required | Default | Description |
|---|---:|---|---|
| `date` | Yes | - | Date used by the default output filename |
| `provider` | Yes | - | AI provider name (`openai` or `openai-compatible`) |
| `api-base` | Yes | - | AI API base URL |
| `model` | Yes | - | Model name |
| `content` | Conditional | Empty | Input text passed directly |
| `source-file` | Conditional | Empty | File containing the input text |
| `template-file` | No | Empty | Markdown template file appended to the input |
| `prompt` | Yes | - | Generation instructions |
| `output-file` | No | `{date}-development-log.md` | Output path or filename |
| `max-content-bytes` | Yes | - | Maximum input content size in bytes |
| `api-key` | Yes | - | AI API key |

Use either `content` or `source-file`. When both are provided, `source-file` takes precedence.

Inputs over `max-content-bytes` fail before the AI provider is called.

## Input example

```yaml
- id: generate
  uses: Sunnymoon724/kozae-forge/actions/generate-content@main
  with:
    date: 2026-09-09
    provider: openai
    api-base: https://api.openai.com/v1
    model: gpt-4o-mini
    content: ${{ steps.collect.outputs.changes }}
    prompt: Write a Markdown development log from the Git diff below. Focus on the actual changes, not commit messages.
    output-file: 2026-09-08-development-log.md
    max-content-bytes: 100000
    api-key: ${{ secrets.API_KEY }}
```

## Outputs

| Output | Description |
|---|---|
| `file-name` | Generated file path |

## Output example

```yaml
file-name: 2026-09-08-development-log.md
```
