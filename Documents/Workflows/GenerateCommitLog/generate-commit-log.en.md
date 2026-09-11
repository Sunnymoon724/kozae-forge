# Generate commit log

## 1. Process

1. Calculate the previous day's time range using the selected timezone.
2. `collect-commits` collects commits as text.
3. `generate-content` uses AI to write content in the requested format.
4. If `output-file` is set, the generated file is saved at that path. Otherwise, it is uploaded as the `generated-content` artifact.

This workflow does not commit files to the repository or publish externally.

The workflow processes `target-date` from 00:00 through the following day's 00:00.

## 2. Usage

```yaml
jobs:
  generate:
    uses: Sunnymoon724/kozae-forge/.github/workflows/generate-commit-log.yml@main
    with:
      provider: openai
      api-base: https://api.openai.com/v1
      model: gpt-4o-mini
      max-content-bytes: 100000
      target-date: 2026-09-08
      author: Jane Doe
      prompt: Write a Markdown development log from the commit history.
      output-file: docs/development-log.md
    secrets:
      API_KEY: ${{ secrets.API_KEY }}
```

If `output-file` is omitted, download the artifact in a later job:

```yaml
- uses: actions/download-artifact@v4
  with:
    name: generated-content
```

## 3. Actions used

- `collect-commits`
- `generate-content`
- `actions/upload-artifact`
