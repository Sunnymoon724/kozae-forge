# Generate commit log

## 1. Process

1. Calculate the previous day's time range using the selected timezone.
2. `collect-commits` collects commits as text.
3. `prepare-content`, `validate-content-size`, and `request-content` use AI to write content in the requested format.
4. `write-content` saves the generated content in the job's temporary workspace as `${date}-${tag}.md`.
5. The generated file is always uploaded as the `generated-content` artifact.

This workflow does not persist or commit files to the repository. Use the `save-content` Action in a later job to restore the artifact to its workspace, then commit and push it separately if needed.

The workflow processes `target-date` from 00:00 through the following day's 00:00.

## 2. Usage

### Token registration

Register the `API_KEY` Actions secret required by the AI provider.

### Input configuration

Configure the workflow inputs shown in the example below.

### Workflow configuration

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
      authors: Jane Doe
      prompt: Write a Markdown development log from the commit history.
      tag: development-log
    secrets:
      API_KEY: ${{ secrets.API_KEY }}
```

With `tag: development-log`, the generated file is created in the job workspace as `${target-date}-development-log.md`. The result is always available as the `generated-content` artifact. Download it to the destination directory required by the next job:

```yaml
- uses: actions/download-artifact@v4
  with:
    name: generated-content
```

## 3. Actions used

- `collect-commits`
- `prepare-content`
- `validate-content-size`
- `request-content`
- `save-content`
- `actions/upload-artifact`
