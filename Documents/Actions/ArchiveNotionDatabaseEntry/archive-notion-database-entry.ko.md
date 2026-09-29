# archive-notion-database-entry

Notion 데이터베이스 페이지를 보관 처리해 활성 항목에서 숨깁니다.

## 입력

| 입력 | 필수 | 설명 |
|---|---:|---|
| `page-id` | 예 | Notion 페이지 ID |
| `notion-token` | 예 | Notion 통합 토큰 |

```yaml
- uses: Sunnymoon724/kozae-forge/actions/archive-notion-database-entry@main
  with:
    page-id: ${{ steps.entry.outputs.page-id }}
    notion-token: ${{ secrets.NOTION_TOKEN }}
```
