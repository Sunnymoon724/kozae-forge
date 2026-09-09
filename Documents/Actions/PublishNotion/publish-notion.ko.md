# publish-notion

콘텐츠 파일을 Notion 부모 페이지 아래에 새 페이지로 업로드하는 GitHub Action입니다.

## 입력값

| 입력값 | 필수 여부 | 기본값 | 설명 |
|---|---|---|---|
| `content-file` | 예 | - | 업로드할 콘텐츠 파일 |
| `parent-page-id` | 예 | - | 새 페이지를 생성할 Notion 부모 페이지 ID |
| `title` | 예 | - | 생성할 Notion 페이지 제목 |
| `notion-token` | 예 | - | Notion Integration Token |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/publish-notion@main
  with:
    content-file: generated.md
    parent-page-id: ${{ secrets.NOTION_PARENT_PAGE_ID }}
    title: 2026-09-09 개발일지
    notion-token: ${{ secrets.NOTION_TOKEN }}
```

## 사전 설정

Notion Integration을 만들고 대상 부모 페이지에 해당 Integration을 연결해야 합니다.
