# append-external-image-links

A GitHub Action that copies a Markdown file and appends a reference-image section with public URLs. It does not upload images; the files must already be served by the public site.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `source-file` | Yes | - | Source Markdown file |
| `image-files` | Yes | - | Newline-separated image file paths |
| `public-base-url` | Yes | - | Public site base URL |
| `public-path` | No | `/media` | Public image directory path |
| `output-file` | No | `.generated-content/notion-entry-with-images.md` | Output file path |

## Outputs

| Output | Default | Description |
|---|---|---|
| `content-file` | - | Path of the copied content with links |

## Input example

```yaml
- id: images
  uses: Sunnymoon724/kozae-forge/actions/append-external-image-links@main
  with:
    source-file: report.md
    image-files: |
      Chronicle/static/media/example.png
    public-base-url: https://example.pages.dev
    public-path: /media
```

## Output example

```yaml
content-file: .generated-content/notion-entry-with-images.md
```
