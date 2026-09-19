# create-notion-page

콘텐츠 파일로 Notion 페이지 하나를 생성합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `content-file` | 예 | - | 콘텐츠 파일 |
| `parent-page-id` | 예 | - | 상위 페이지 ID |
| `title` | 예 | - | 페이지 제목 |
| `notion-token` | 예 | - | Notion 통합 토큰 |

## 출력값

| 출력값 | 기본값 | 설명 |
|---|---|---|
| `page-id` | - | 생성된 페이지 ID |

## 입력 예시

```yaml
- id: page
  uses: Sunnymoon724/kozae-forge/actions/create-notion-page@main
  with:
    content-file: output/article.md
    parent-page-id: ${{ vars.NOTION_PARENT_PAGE_ID }}
    title: 주간 업데이트
    notion-token: ${{ secrets.NOTION_TOKEN }}
```

## 출력 예시

```yaml
page-id: 12345678-1234-1234-1234-123456789abc
```
