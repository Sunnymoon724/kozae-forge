# 외부 이미지 링크 추가

Markdown 파일을 복사하고 공개 URL을 사용한 참고 이미지 섹션을 추가합니다. 이미지를 업로드하지 않으므로 파일은 공개 사이트에서 이미 제공되어야 합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `source-file` | 예 | - | 원본 Markdown 파일 |
| `image-files` | 예 | - | 줄바꿈으로 구분한 이미지 파일 경로 |
| `public-base-url` | 예 | - | 공개 사이트 기본 URL |
| `public-path` | 아니오 | `/media` | 공개 이미지 폴더 경로 |
| `output-file` | 아니오 | `.generated-content/notion-entry-with-images.md` | 결과 파일 경로 |

## 출력값

| 출력값 | 기본값 | 설명 |
|---|---|---|
| `content-file` | - | 링크가 추가된 파일 경로 |

## 입력 예시

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

## 출력 예시

```yaml
content-file: .generated-content/notion-entry-with-images.md
```
