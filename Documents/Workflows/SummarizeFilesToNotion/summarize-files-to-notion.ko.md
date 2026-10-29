# 파일 요약을 Notion에 게시

UTF-8 텍스트 파일을 받아 AI로 요약한 뒤, Markdown 형식의 요약 결과 하나를 Notion 데이터베이스에 올리는 재사용 Workflow입니다.

## 1. 처리 방법

1. 텍스트 파일 Artifact를 다운로드하고 `file-names`에 지정한 파일을 하나로 합칩니다.
2. 호출한 저장소의 프롬프트와 선택적 템플릿을 결합합니다.
3. 합친 내용을 AI로 한 번 요약하고, 호출자가 전달한 `title`로 Notion 항목 하나를 게시합니다.

파일명에 날짜나 `.md` 확장자가 없어도 됩니다. 기본적으로 재실행하면 같은 제목의 항목이 하나 더 생깁니다. `upsert: true`를 지정하면 기존 항목을 갱신하고, 선택적으로 Notion 날짜 속성과 이미지를 처리할 수 있습니다.

## 2. 사용 방법

### 토큰 등록

호출하는 저장소의 Actions secrets에 AI 제공자 키와 Notion 통합 토큰을 등록합니다.

```text
Settings → Secrets and variables → Actions
```

Secret 이름: `AI_API_KEY`, `NOTION_TOKEN`.

### 입력값 설정

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `runner` | 아니오 | `ubuntu-latest` | Runner 레이블 |
| `runner-labels` | 아니오 | 빈 값 | 선택적 Runner 레이블 JSON 배열 |
| `checkout-ref` | 아니오 | 빈 값 | 프롬프트와 이미지 참조에 사용할 호출 저장소의 ref |
| `artifact-name` | 아니오 | `generated-content` | UTF-8 텍스트 파일이 들어 있는 Artifact 이름 |
| `file-names` | 예 | - | Artifact 안의 파일명 JSON 배열 |
| `prompt-source-file` | 예 | - | 호출한 저장소의 AI 요약 프롬프트 파일 |
| `prompt-template-file` | 아니오 | 빈 값 | 선택적 프롬프트 템플릿 파일 |
| `provider` | 예 | - | AI 제공자 |
| `api-base` | 예 | - | AI API 기본 URL |
| `model` | 예 | - | AI 모델 |
| `notion-source-url` | 예 | - | Notion 데이터베이스 또는 데이터 소스 URL |
| `title-property` | 예 | - | Notion 제목 속성명 |
| `title` | 예 | - | Notion 항목 하나에 사용할 제목 |
| `group-property` | 아니오 | 빈 값 | 선택적 Select 속성명 |
| `group-value` | 아니오 | 빈 값 | 선택적 Select 값 |
| `upsert` | 아니오 | `false` | 같은 제목의 기존 항목을 갱신할지 여부 |
| `date-property` | 아니오 | 빈 값 | 선택적 Notion 날짜 속성명. `date`, `upsert: true`와 함께 사용 |
| `date` | 아니오 | 빈 값 | 선택적 `YYYY-MM-DD` 날짜. `date-property`, `upsert: true`와 함께 사용 |
| `image-files` | 아니오 | 빈 값 | `upsert: true`에서 사용할 호출 저장소 이미지 경로 목록(줄바꿈 구분) |
| `image-storage` | 아니오 | `notion` | 이미지 저장 방식: `notion` 또는 `external` |
| `image-public-base-url` | 아니오 | 빈 값 | 외부 이미지의 공개 사이트 URL |
| `image-public-path` | 아니오 | `/media` | 외부 이미지의 공개 폴더 경로 |

### Workflow 설정

```yaml
jobs:
  publish-notion:
    uses: Sunnymoon724/kozae-forge/.github/workflows/summarize-files-to-notion.yml@main
    with:
      file-names: '["planning.txt","implementation.md"]'
      prompt-source-file: prompts/summarize.md
      provider: ${{ vars.AI_PROVIDER }}
      api-base: ${{ vars.AI_API_URL }}
      model: ${{ vars.AI_MODEL }}
      notion-source-url: ${{ vars.NOTION_REPORT_DATA_SOURCE_URL }}
      title-property: Name
      title: 스프린트 작업 요약
    secrets:
      API_KEY: ${{ secrets.AI_API_KEY }}
      NOTION_TOKEN: ${{ secrets.NOTION_TOKEN }}
```

## 3. 사용 Action

- `actions/checkout`
- `actions/download-artifact`
- `combine-text-files`
- `prepare-content`
- `request-content`
- `save-content`
- `resolve-notion-data-source`
- `create-notion-database-entry`
- `upsert: true`일 때 `find-notion-database-entry`, `update-notion-database-entry-properties`, `clear-notion-page`, `append-notion-page-content`
- `upsert: true`에서 이미지가 있으면 `upload-notion-file` 또는 `append-external-image-links`
