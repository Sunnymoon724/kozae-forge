# Generate commit log

## 1. Process

1. Resolve the requested dates in the selected timezone. When both dates are empty, the workflow uses yesterday. When only `start-date` is set, it processes that date only.
2. The workflow validates the dates and limits a range to 31 days.
3. Each date is processed separately. `collect-git-commits` collects commits for that date.
4. `prepare-content`, `validate-content-size`, and `request-content` use AI to write content in the requested format.
5. Dates without commits do not create files.
6. All generated files are combined into one `generated-content` artifact.

This workflow does not persist or commit files to the repository. Use the `generated-content` artifact in a later job, then commit and push the files separately if needed.

## 2. Usage

### Token registration

Register the `API_KEY` Actions secret required by the AI provider.

```text
Settings → Secrets and variables → Actions
```

Secret name:

```text
API_KEY
```

### Input configuration

| Input | Required | Default | Description |
|---|---:|---|---|
| `runner` | No | `ubuntu-latest` | Runner label used for workflow jobs |
| `branch` | No | `main` | Branch to read commits from |
| `timezone` | Yes | - | IANA timezone |
| `start-date` | No | Empty | Start date in `YYYY-MM-DD`; uses yesterday when empty with no `end-date` |
| `end-date` | No | Empty | End date in `YYYY-MM-DD`; empty means `start-date` only |
| `authors` | No | Empty | Commit author filters |
| `provider` | Yes | - | AI provider |
| `api-base` | Yes | - | AI API base URL |
| `model` | Yes | - | AI model |
| `max-content-bytes` | Yes | - | Maximum input content size |
| `prompt` | Yes | - | Content generation prompt |
| `tag` | Yes | - | Tag in the generated filename |

`end-date` cannot be used without `start-date`. The date range cannot be longer than 31 days, and `start-date` cannot be later than `end-date`.

### Workflow configuration

```yaml
jobs:
  generate:
    uses: Sunnymoon724/kozae-forge/.github/workflows/generate-commit-log.yml@main
    with:
      runner: self-hosted
      provider: openai
      api-base: https://api.openai.com/v1
      model: gpt-4o-mini
      max-content-bytes: 100000
      start-date: 2026-09-01
      end-date: 2026-09-07
      authors: Jane Doe
      prompt: Write a Markdown development log from the commit history.
      tag: development-log
    secrets:
      API_KEY: ${{ secrets.API_KEY }}
```

With `tag: development-log`, generated files use the `${date}-development-log.md` format. All files with commits are available in the single `generated-content` artifact.

```yaml
- uses: actions/download-artifact@v4
  with:
    name: generated-content
```

## 3. Actions used

- `calculate-date-range`
- `collect-git-commits`
- `prepare-content`
- `validate-content-size`
- `request-content`
- `save-content`
- `actions/upload-artifact`
- `actions/download-artifact`
