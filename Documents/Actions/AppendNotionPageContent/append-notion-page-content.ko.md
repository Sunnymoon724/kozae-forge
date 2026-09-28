# append-notion-page-content

콘텐츠 파일과 선택한 이미지 블록을 기존 Notion 페이지에 추가합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `content-file` | 예 | - | 콘텐츠 파일 경로 |
| `page-id` | 예 | - | 기존 Notion 페이지 ID |
| `notion-token` | 예 | - | Notion 통합 토큰 |
| `image-file-uploads` | 아니오 | `[]` | Notion 파일 업로드 ID의 JSON 배열 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/append-notion-page-content@main
  with:
    content-file: output/article.md
    page-id: ${{ vars.NOTION_PAGE_ID }}
    notion-token: ${{ secrets.NOTION_TOKEN }}
```
