# Save content

## 1. Process

1. Download the `generated-content` artifact.
2. Save the content file to the specified directory.
3. Commit the changes.
4. Push to the specified branch.

## 2. Usage

A previous job, such as `generate-commit-log`, must create the `generated-content` artifact first.

```yaml
jobs:
  save:
    needs: generate
    uses: Sunnymoon724/kozae-forge/.github/workflows/save-content.yml@main
    with:
      file-directory: Documents/Blog
      branch: main
```

The default `file-directory` is `Documents/Blog`.

## 3. Actions used

- `actions/download-artifact`
- `commit-changes`
- `push-changes`
