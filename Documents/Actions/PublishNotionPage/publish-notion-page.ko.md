# publish-notion-page

같은 제목의 Notion 페이지가 있으면 내용을 수정하고, 없으면 새 페이지를 생성하는 GitHub Action입니다.

## 입력값

| 입력값 | 필수 여부 | 기본값 | 설명 |
|---|---|---|---|
| `content-file` | 예 | - | 업로드할 콘텐츠 파일 |
| `parent-page-id` | 예 | - | Notion 부모 페이지 ID |
| `title` | 예 | - | 생성하거나 수정할 페이지 제목 |
| `notion-token` | 예 | - | Notion Integration Token |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/publish-notion-page@main
  with:
    content-file: generated.md
    parent-page-id: ${{ secrets.NOTION_PARENT_PAGE_ID }}
    title: 개발일지
    notion-token: ${{ secrets.NOTION_TOKEN }}
```
