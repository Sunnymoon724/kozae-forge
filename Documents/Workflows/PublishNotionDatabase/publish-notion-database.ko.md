# Notion 데이터베이스 항목 게시

항목이 없으면 생성하고, 있으면 속성을 갱신하고 콘텐츠를 교체하는 재사용 GitHub Actions 워크플로입니다.

## 1. 처리 과정

1. 호출 저장소를 checkout하고 데이터베이스 URL에서 데이터 소스를 찾습니다.
2. 제목으로 활성 항목을 찾습니다.
3. 항목이 없으면 새로 생성합니다.
4. 항목이 있으면 속성을 갱신하고 블록을 비운 뒤 콘텐츠 파일을 추가합니다.

## 2. 사용 방법

### 토큰 등록

Notion 통합 토큰을 `NOTION_TOKEN` 이름의 Actions Secret으로 등록합니다.

### 입력값 설정

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `content-file` | 예 | - | 저장소 기준 콘텐츠 파일 경로 |
| `source-url` | 예 | - | Notion 데이터베이스 URL |
| `title-property` | 예 | - | 데이터베이스 제목 속성 이름 |
| `title` | 예 | - | 항목 제목 |
| `group-property` | 예 | - | Select 속성 이름 |
| `group-value` | 예 | - | Select 속성 값 |
| `date-property` | 아니오 | 빈 값 | 날짜 속성 이름 |
| `date` | 아니오 | 빈 값 | 날짜 값 |

### 워크플로 설정

```yaml
jobs:
  publish:
    uses: Sunnymoon724/kozae-forge/.github/workflows/publish-notion-database.yml@main
    with:
      content-file: output/article.md
      source-url: ${{ vars.NOTION_DATABASE_URL }}
      title-property: Name
      title: Weekly update
      group-property: Category
      group-value: Engineering
      date-property: Published
      date: 2026-09-15
    secrets:
      notion-token: ${{ secrets.NOTION_TOKEN }}
```

## 3. 사용 Action

- `resolve-notion-data-source`
- `find-notion-database-entry`
- `create-notion-database-entry`
- `update-notion-database-entry-properties`
- `clear-notion-page`
- `append-notion-page-content`
