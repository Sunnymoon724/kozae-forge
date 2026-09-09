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
| `prompt` | Yes | - | Generation instructions |
| `output-file` | No | `{date}-development-log.md` | Output path or filename |
| `api-key` | Yes | - | AI API key |

Use either `content` or `source-file`. When both are provided, `source-file` takes precedence.

## Input example

```yaml
- id: generate
  uses: Sunnymoon724/kozae-forge/actions/generate-content@main
  with:
    date: 2026-09-09
    provider: openai
    api-base: https://api.openai.com/v1
    model: gpt-4o-mini
    content: ${{ steps.collect.outputs.commits }}
    prompt: Write a Markdown development log from the commit history.
    output-file: 2026-09-08-development-log.md
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
