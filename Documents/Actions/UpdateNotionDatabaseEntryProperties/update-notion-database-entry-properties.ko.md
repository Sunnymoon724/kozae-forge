# update-notion-database-entry-properties

기존 Notion 데이터베이스 항목의 그룹과 선택적 날짜 속성을 갱신합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `page-id` | 예 | - | 기존 데이터베이스 페이지 ID |
| `group-property` | 예 | - | Select 속성 이름 |
| `group-value` | 예 | - | Select 속성 값 |
| `date-property` | 아니오 | 빈 값 | 날짜 속성 이름 |
| `date` | 아니오 | 빈 값 | 날짜 값 |
| `notion-token` | 예 | - | Notion 통합 토큰 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/update-notion-database-entry-properties@main
  with:
    page-id: ${{ steps.page.outputs.page-id }}
    group-property: Category
    group-value: Engineering
    date-property: Published
    date: 2026-09-19
    notion-token: ${{ secrets.NOTION_TOKEN }}
```
