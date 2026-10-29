# Combine text files

A GitHub Action that combines selected UTF-8 text files into one file for a single summarization request. Filenames need neither dates nor a Markdown extension.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `directory` | Yes | - | Directory containing the text files |
| `file-names` | Yes | - | Non-empty JSON array of text filenames |
| `output-file` | No | `.generated-content/combined-content.md` | Path of the combined file |

## Outputs

| Output | Default | Description |
|---|---|---|
| `content-file` | - | Path of the combined content file |

## Input example

```yaml
- id: combined
  uses: Sunnymoon724/kozae-forge/actions/combine-text-files@main
  with:
    directory: .generated-content
    file-names: '["planning.txt","implementation.md"]'
```

## Output example

```yaml
content-file: .generated-content/combined-content.md
```
