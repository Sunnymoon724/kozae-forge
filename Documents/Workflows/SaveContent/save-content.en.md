# Save content

## 1. Process

1. Download the `generated-content` artifact.
2. Save the content file to the specified directory.
3. Commit the changes.
4. Push to the specified branch.

## 2. Usage

```yaml
jobs:
  generate:
    uses: Sunnymoon724/kozae-forge/.github/workflows/generate-commit-log.yml@main
    with:
      api-url: https://api.openai.com/v1/chat/completions
      model: gpt-4o-mini
      prompt: Write a Markdown development log from the commit history.
    secrets:
      AI_API_KEY: ${{ secrets.AI_API_KEY }}

  save:
    needs: generate
    uses: Sunnymoon724/kozae-forge/.github/workflows/save-content.yml@main
    with:
      file-directory: Documents/Blog
      branch: main
```

## 3. Actions used

- `actions/download-artifact`
- `commit-changes`
- `push-changes`
