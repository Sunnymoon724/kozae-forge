# 커밋 로그 생성

## 1. 처리 방법

1. 선택한 시간대를 기준으로 처리할 날짜를 정합니다. 두 날짜가 모두 비어 있으면 어제를 사용하고, `start-date`만 입력하면 그 날짜만 처리합니다.
2. 날짜 형식을 확인하고, 최대 31일까지 처리할 수 있도록 제한합니다.
3. 날짜마다 `collect-commits-by-time`이 해당 날짜의 커밋을 수집합니다.
4. `prepare-content`, `validate-content-size`, `request-content`가 AI로 요청한 형식의 글을 작성합니다.
5. 커밋이 없는 날짜는 파일을 만들지 않습니다.
6. 생성된 파일을 하나의 `generated-content` Artifact로 묶습니다.

이 Workflow는 저장소에 파일을 영구 저장하거나 커밋하지 않습니다. 후속 Job에서 `generated-content` Artifact를 다운로드한 뒤 별도로 commit과 push를 수행합니다.

## 2. 사용 방법

### 토큰 등록

AI Provider에 필요한 `API_KEY` Actions Secret을 등록합니다.

```text
Settings → Secrets and variables → Actions
```

Secret 이름:

```text
API_KEY
```

### 입력값 설정

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `runner` | 아니오 | `ubuntu-latest` | Workflow Job에 사용할 Runner 레이블 |
| `branch` | 아니오 | `main` | 커밋을 읽을 브랜치 |
| `timezone` | 예 | - | IANA 시간대 |
| `start-date` | 아니오 | 빈 값 | 시작 날짜 (`YYYY-MM-DD`). `end-date`도 비어 있으면 어제 사용 |
| `end-date` | 아니오 | 빈 값 | 종료 날짜 (`YYYY-MM-DD`). 비어 있으면 `start-date`만 처리 |
| `authors` | 아니오 | 빈 값 | 커밋 작성자 필터 |
| `provider` | 예 | - | AI Provider |
| `api-base` | 예 | - | AI API 기본 URL |
| `model` | 예 | - | AI 모델 |
| `max-content-bytes` | 예 | - | 입력 콘텐츠 최대 크기 |
| `prompt` | 예 | - | 콘텐츠 생성 프롬프트 |
| `tag` | 예 | - | 생성 파일명의 태그 |

`start-date` 없이 `end-date`만 입력할 수 없습니다. 기간은 최대 31일까지이며, `start-date`는 `end-date`보다 늦을 수 없습니다.

### Workflow 설정

```yaml
jobs:
  generate:
    uses: Sunnymoon724/kozae-forge/.github/workflows/generate-commit-log.yml@main
    with:
      runner: self-hosted
      provider: openai
      api-base: https://api.openai.com/v1
      model: gpt-4o-mini
      max-content-bytes: 100000
      start-date: 2026-09-01
      end-date: 2026-09-07
      authors: 홍길동
      prompt: 커밋 기록을 바탕으로 쉬운 한국어 개발일지를 작성해줘.
      tag: development-log
    secrets:
      API_KEY: ${{ secrets.API_KEY }}
```

`tag`가 `development-log`이면 커밋이 있는 날짜마다 `${date}-development-log.md` 파일이 생성됩니다. 모든 파일은 하나의 `generated-content` Artifact에 들어갑니다.

```yaml
- uses: actions/download-artifact@v4
  with:
    name: generated-content
```

## 3. 사용 Action

- `calculate-date-range`
- `collect-commits-by-time`
- `prepare-content`
- `validate-content-size`
- `request-content`
- `save-content`
- `actions/upload-artifact`
- `actions/download-artifact`
