# Generate commit log

## 1. Process

1. Calculate the previous day's time range using the selected timezone.
2. `collect-commits` collects commits as text.
3. `generate-content` uses AI to write content in the requested format.
4. The generated file is uploaded as the `generated-content` artifact.

This workflow does not save files to the repository or publish externally.

## 2. Usage

```yaml
jobs:
  generate:
    uses: Sunnymoon724/kozae-forge/.github/workflows/generate-commit-log.yml@main
    with:
      provider: openai
      api-base: https://api.openai.com/v1
      model: gpt-4o-mini
      prompt: Write a Markdown development log from the commit history.
    secrets:
      API_KEY: ${{ secrets.API_KEY }}
```

Download the artifact in a later job:

```yaml
- uses: actions/download-artifact@v4
  with:
    name: generated-content
```

## 3. Actions used

- `collect-commits`
- `generate-content`
- `actions/upload-artifact`
