# Daily development log

A reusable workflow that creates the previous day's development log from commit history.

## 1. Process

The workflow calculates the time range, collects commits, generates content with AI, and optionally saves or publishes the result.

## 2. Usage

Add the following job to the source repository workflow.

```yaml
name: Daily development log

on:
  schedule:
    - cron: '5 15 * * *'
  workflow_dispatch:

jobs:
  daily-log:
    uses: Sunnymoon724/kozae-forge/.github/workflows/daily-development-log.yml@main
    with:
      file-directory: Documents/Blog
      api-url: https://api.openai.com/v1/chat/completions
      model: gpt-4o-mini
      prompt: Write a Markdown development log from the collected commit history.
    secrets:
      AI_API_KEY: ${{ secrets.AI_API_KEY }}
```

Saving the file and publishing externally can be enabled independently.

```yaml
with:
  file-directory: Documents/Blog
  save-file: true
  publish: false
  api-url: https://api.openai.com/v1/chat/completions
  model: gpt-4o-mini
  prompt: Write a Markdown development log from the collected commit history.
```

When `publish` is enabled, the generated content is sent as JSON to the external webhook specified by `publish-url`.

The cron expression uses UTC. The example runs every day at 00:05 Korea Standard Time.

The workflow does not create a duplicate if a log for the same date already exists. It also exits when there were no commits on the previous day.

The default output file is:

```text
Documents/Blog/YYYY-MM-DD-development-log.md
```

The current version creates a Markdown file from commit messages. An AI summarization step can be connected later.

## 3. Actions used

- `collect-commits`
- `generate-content`
- `write-content` or `copy-file`
- `commit-changes`
- `push-changes`
- `publish-content`
