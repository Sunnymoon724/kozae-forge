# Notion 데이터베이스 항목 게시

항목이 없으면 생성하고, 있으면 속성을 갱신하고 콘텐츠를 교체하는 재사용 GitHub Actions 워크플로입니다.

Rate Limit이나 서버 오류처럼 잠시 발생하는 Notion API 오류는 짧게 기다린 뒤 다시 시도합니다. 항목이 중복 생성되지 않도록 생성 요청은 자동으로 다시 시도하지 않습니다.

## 1. 처리 과정

1. 호출 저장소를 checkout하고 데이터베이스 URL에서 데이터 소스를 찾습니다. 이미 조회한 `data-source-id`를 받으면 URL 조회를 건너뜁니다.
2. 제목으로 활성 항목을 찾고, 제목 속성 이름이 생략되면 데이터 소스에서 자동으로 찾습니다.
3. 항목이 없으면 새로 생성합니다.
4. 항목이 있으면 속성을 갱신하고 블록을 비운 뒤 콘텐츠를 추가합니다.
5. `content-format`이 `markdown`이면 제목, 목록, 체크박스, 구분선, 링크를 Notion 블록으로 변환합니다.
5. `image-files`가 있으면 PNG/GIF를 업로드하고 이미지 블록을 함께 추가합니다.

## 2. 사용 방법

### 토큰 등록

Notion 통합 토큰을 `NOTION_TOKEN` 이름의 Actions Secret으로 등록합니다.

```text
Settings → Secrets and variables → Actions
```

Secret 이름:

```text
NOTION_TOKEN
```

### 입력값 설정

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `runner` | 아니오 | `ubuntu-latest` | 게시 Job에 사용할 Runner 레이블 |
| `runner-labels` | 아니오 | 빈 값 | Runner 레이블 JSON 배열. 예: `["self-hosted", "Windows", "X64"]` |
| `content-file` | 조건부 | 빈 값 | 저장소 기준 콘텐츠 파일 경로. `content` 중 하나 사용 |
| `content` | 조건부 | 빈 값 | 직접 전달할 콘텐츠. `content-file` 중 하나 사용 |
| `content-format` | 아니오 | `plain` | `markdown`이면 제목, 목록, 체크박스, 구분선, 링크를 Notion 블록으로 변환 |
| `source-url` | 아니오 | 빈 값 | Notion 데이터베이스 URL. `data-source-id`가 비어 있을 때 필요합니다. |
| `data-source-id` | 아니오 | 빈 값 | 미리 조회한 데이터 소스 ID. 입력하면 URL 조회를 건너뜁니다. |
| `title-property` | 아니오 | 빈 값 | 생략하면 데이터 소스에서 제목 속성을 찾음 |
| `title` | 예 | - | 항목 제목 |
| `group-property` | 아니오 | 빈 값 | Select 속성 이름 |
| `group-value` | 아니오 | 빈 값 | Select 속성 값 |
| `status-property` | 아니오 | 빈 값 | Notion Status 속성 이름 |
| `status-value` | 아니오 | 빈 값 | Notion Status 값 |
| `date-property` | 아니오 | 빈 값 | 날짜 속성 이름 |
| `date` | 아니오 | 빈 값 | 날짜 값 |
| `image-files` | 아니오 | 빈 값 | PNG/GIF 파일 경로를 줄바꿈으로 구분한 목록 |
| `image-storage` | 아니오 | `notion` | 직접 업로드는 `notion`, Cloudflare R2 링크는 `r2` |

### Workflow 설정

```yaml
jobs:
  publish:
    uses: Sunnymoon724/kozae-forge/.github/workflows/publish-notion-database.yml@main
    with:
      runner-labels: '["self-hosted", "Windows", "X64"]'
      content-format: markdown
      content: |
        ## Weekly update
        - [ ] Review the release
      source-url: ${{ vars.NOTION_DATABASE_URL }}
      title: Weekly update
      status-property: Status
      status-value: In progress
      date-property: Published
      date: 2026-09-15
      image-files: |
        output/chart.png
        output/preview.gif
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
- `upload-notion-file`
