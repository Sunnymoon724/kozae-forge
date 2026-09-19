# create-notion-database-entry

초기 속성과 콘텐츠를 포함한 Notion 데이터베이스 항목 하나를 생성합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `data-source-id` | 예 | - | Notion 데이터 소스 ID |
| `title-property` | 예 | - | 제목 속성 이름 |
| `title` | 예 | - | 항목 제목 |
| `group-property` | 예 | - | Select 속성 이름 |
| `group-value` | 예 | - | Select 속성 값 |
| `date-property` | 아니오 | 빈 값 | 날짜 속성 이름 |
| `date` | 아니오 | 빈 값 | 날짜 값 |
| `content-file` | 예 | - | 콘텐츠 파일 |
| `notion-token` | 예 | - | Notion 통합 토큰 |

## 출력값

| 출력값 | 기본값 | 설명 |
|---|---|---|
| `page-id` | - | 생성된 데이터베이스 페이지 ID |

## 입력 예시

```yaml
- id: page
  uses: Sunnymoon724/kozae-forge/actions/create-notion-database-entry@main
  with:
    data-source-id: ${{ vars.NOTION_DATA_SOURCE_ID }}
    title-property: Name
    title: 주간 업데이트
    group-property: Category
    group-value: Engineering
    content-file: output/article.md
    notion-token: ${{ secrets.NOTION_TOKEN }}
```

## 출력 예시

```yaml
page-id: 12345678-1234-1234-1234-123456789abc
```
