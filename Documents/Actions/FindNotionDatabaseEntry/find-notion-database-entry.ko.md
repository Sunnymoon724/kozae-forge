# find-notion-database-entry

제목으로 활성 Notion 데이터베이스 항목 하나를 찾습니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `data-source-id` | 예 | - | Notion 데이터 소스 ID |
| `title-property` | 예 | - | 제목 속성 이름 |
| `title` | 예 | - | 항목 제목 |
| `notion-token` | 예 | - | Notion 통합 토큰 |

## 출력값

| 출력값 | 기본값 | 설명 |
|---|---|---|
| `page-id` | 빈 값 | 일치하는 페이지 ID |

## 입력 예시

```yaml
- id: page
  uses: Sunnymoon724/kozae-forge/actions/find-notion-database-entry@main
  with:
    data-source-id: ${{ vars.NOTION_DATA_SOURCE_ID }}
    title-property: Name
    title: Weekly update
    notion-token: ${{ secrets.NOTION_TOKEN }}
```

## 출력 예시

```yaml
page-id: 12345678-1234-1234-1234-123456789abc
```
