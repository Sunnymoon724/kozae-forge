# Generate content from commits

## 1. Process

1. Resolve the requested dates in the selected timezone. When both dates are empty, the workflow uses yesterday. When only `start-date` is set, it processes that date only.
2. The workflow validates the dates and limits a range to 31 days.
3. The repository is checked out once, and commits for all requested dates are collected together.
4. Each date is processed separately. `prepare-content` and `request-content` use AI to write content in the requested format. Commit lists larger than `max-content-bytes` are summarized in chunks before one final document is generated.
5. Dates without commits do not create Markdown files.
6. Files downloaded into a fresh temporary directory are combined into one `generated-content` artifact. If there are no commits, that artifact contains only `no-content.txt` so downstream artifact downloads remain valid and stale runner files are ignored.
7. If the whole range has no commits, an empty marker keeps the collection artifact available, including the hidden collection directory.
8. Downstream generation skips dates without a commit file.
9. The collection step logs the checked-out branch, HEAD, dates, author filter, per-date results, and generated file list.

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
| `branch-prefix` | No | Empty | Optional prefix for a branch name based on the resolved dates |
| `authors` | No | Empty | Commit author filters |
| `exclude-merge-commits` | No | `false` | Exclude merge commits from the collected history |
| `provider` | Yes | - | AI provider |
| `api-base` | Yes | - | AI API base URL |
| `model` | Yes | - | AI model |
| `max-content-bytes` | Yes | - | Maximum UTF-8 bytes per AI request; larger inputs are summarized in chunks |
| `prompt` | No | Empty | Inline generation prompt; provide this or `prompt-source-file` |
| `prompt-source-file` | No | Empty | Prompt file in the caller repository; provide this or `prompt` |
| `prompt-template-file` | No | Empty | Optional template file appended to the prompt |
| `tag` | Yes | - | Tag in the generated filename |
| `artifact-prefix` | No | Empty | Prefix for artifact names when several author-filtered calls run in one workflow |

`end-date` cannot be used without `start-date`. The date range cannot be longer than 31 days, and `start-date` cannot be later than `end-date`.
The caller may provide an inline `prompt` or a `prompt-source-file`. When either prompt file input is used, the workflow checks out the caller repository to read it.

The workflow exposes `start-date` and `end-date` outputs after applying date defaults. With `branch-prefix: chronicle-log`, it also exposes `branch-name` such as `chronicle-log-2026-09-01-2026-09-07` (or `chronicle-log-2026-09-01` for one day).

### Outputs

| Output | Description |
|---|---|
| `start-date` | Resolved first date |
| `end-date` | Resolved last date |
| `start-date-display` | First date in `YYYY/MM/DD` format |
| `end-date-display` | Last date in `YYYY/MM/DD` format |
| `branch-name` | Date-based branch name; empty when `branch-prefix` is empty |
| `has-content` | Whether any day produced content |
| `file-names` | JSON array of generated filenames |

### Workflow configuration

```yaml
jobs:
  generate:
    uses: Sunnymoon724/kozae-forge/.github/workflows/generate-content-from-commits.yml@main
    with:
      runner: self-hosted
      provider: openai
      api-base: https://api.openai.com/v1
      model: gpt-4o-mini
      max-content-bytes: 100000
      start-date: 2026-09-01
      end-date: 2026-09-07
      branch-prefix: chronicle-log
      authors: Jane Doe
      exclude-merge-commits: true
      prompt: Write a Markdown development log from the commit history.
      tag: development-log
    secrets:
      API_KEY: ${{ secrets.API_KEY }}
```

To keep prompts in the caller repository, replace `prompt` with:

```yaml
      prompt-source-file: Chronicle/templates/daily-development-log-prompt.md
      prompt-template-file: Chronicle/templates/daily-development-log-web.md
```

With `tag: development-log`, generated files use the `${date}-development-log.md` format. All files with commits are available in the single `generated-content` artifact.
For concurrent member calls, set a distinct `artifact-prefix` such as `member1-`. It prefixes the collection, per-date, and final artifact names; the final artifact becomes `member1-generated-content`.

```yaml
- uses: actions/download-artifact@v4
  with:
    name: generated-content
```

## 3. Actions used

- `resolve-commit-log-dates`
- `collect-dated-commits` (one checkout for all dates)
- `prepare-content`
- `request-content`
- `save-content`
- `actions/upload-artifact`
- `actions/download-artifact`
