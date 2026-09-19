# find-notion-page

제목과 상위 페이지로 Notion 페이지를 찾습니다.

## 입력값

| 입력값 | 필수 | 설명 |
|---|---:|---|
| `title` | 예 | 페이지 제목 |
| `parent-page-id` | 예 | 상위 Notion 페이지 ID |
| `notion-token` | 예 | Notion 통합 토큰 |

## 출력값

| 출력값 | 설명 |
|---|---|
| `page-id` | 일치하는 페이지 ID, 없으면 빈 값 |

## 입력 예시

```yaml
- id: page
  uses: Sunnymoon724/kozae-forge/actions/find-notion-page@main
  with:
    parent-page-id: ${{ vars.NOTION_PARENT_PAGE_ID }}
    title: Weekly update
    notion-token: ${{ secrets.NOTION_TOKEN }}
```

## 출력 예시

```yaml
page-id: 12345678-1234-1234-1234-123456789abc
```
