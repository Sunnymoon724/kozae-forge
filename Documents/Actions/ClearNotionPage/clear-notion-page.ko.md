# clear-notion-page

Notion 페이지의 모든 하위 블록을 보관 처리합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `page-id` | 예 | - | Notion 페이지 ID |
| `notion-token` | 예 | - | Notion 통합 토큰 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/clear-notion-page@main
  with:
    page-id: ${{ vars.NOTION_PAGE_ID }}
    notion-token: ${{ secrets.NOTION_TOKEN }}
```
