# publish-notion-database

같은 제목의 데이터베이스 항목이 있으면 내용을 수정하고, 없으면 새 항목을 생성하는 GitHub Action입니다.

## 입력값

| 입력값 | 필수 여부 | 기본값 | 설명 |
|---|---|---|---|
| `content-file` | 예 | - | 업로드할 콘텐츠 파일 |
| `data-source-id` | 예 | - | Notion 데이터베이스 ID 또는 Data Source ID |
| `title-property` | 예 | - | 데이터베이스 제목 속성 이름 |
| `title` | 예 | - | 찾거나 생성할 항목 제목 |
| `group-property` | 예 | - | 그룹 분류에 사용할 데이터베이스 속성 |
| `group-value` | 예 | - | 해당 속성에 설정할 그룹 값 |
| `date-property` | 아니오 | 빈 값 | 날짜를 저장할 속성 이름 |
| `date` | 아니오 | 빈 값 | 저장할 날짜 (`YYYY-MM-DD`) |
| `notion-token` | 예 | - | Notion Integration Token |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/publish-notion-database@main
  with:
    content-file: generated.md
    data-source-id: ${{ secrets.NOTION_DATA_SOURCE_ID }}
    title-property: 할 일
    title: 2026-09-09
    group-property: 우선순위
    group-value: 일일보고
    date-property: 날짜
    date: 2026-09-09
    notion-token: ${{ secrets.NOTION_TOKEN }}
```
