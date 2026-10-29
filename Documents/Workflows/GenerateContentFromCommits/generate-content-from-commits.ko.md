# 커밋 기반 콘텐츠 생성

## 1. 처리 방법

1. 선택한 시간대를 기준으로 처리할 날짜를 정합니다. 두 날짜가 모두 비어 있으면 어제를 사용하고, `start-date`만 입력하면 그 날짜만 처리합니다.
2. 날짜 형식을 확인하고, 최대 31일까지 처리할 수 있도록 제한합니다.
3. 저장소를 한 번만 Checkout하고 요청한 모든 날짜의 커밋을 함께 수집합니다.
4. 날짜별로 `prepare-content`, `request-content`가 AI로 요청한 형식의 글을 작성합니다. 커밋 목록이 `max-content-bytes`를 넘으면 나눠서 먼저 요약한 뒤 최종 문서 하나를 생성합니다.
5. 커밋이 없는 날짜는 Markdown 파일을 만들지 않습니다.
6. 이번 실행에서 새 임시 폴더로 받은 파일만 하나의 `generated-content` Artifact로 묶습니다. 커밋이 전혀 없으면 후속 다운로드가 실패하지 않도록 `no-content.txt`만 포함하며, 러너에 남은 과거 파일은 무시합니다.
7. 처리 기간에 커밋이 하나도 없어도 빈 표시 파일을 넣어 수집 Artifact를 만들며, 숨김 폴더인 수집 경로도 Artifact에 포함합니다.
8. 후속 작업은 날짜별 커밋 파일이 없으면 해당 날짜를 건너뜁니다.
9. 커밋 수집 단계에서 Checkout 브랜치, HEAD, 날짜, 작성자 필터, 날짜별 결과, 생성 파일 목록을 로그로 남깁니다.

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
| `branch-prefix` | 아니오 | 빈 값 | 계산된 날짜로 브랜치 이름을 만들 때 사용할 접두사 |
| `authors` | 아니오 | 빈 값 | 커밋 작성자 필터 |
| `exclude-merge-commits` | 아니오 | `false` | 수집한 기록에서 병합 커밋 제외 |
| `provider` | 예 | - | AI Provider |
| `api-base` | 예 | - | AI API 기본 URL |
| `model` | 예 | - | AI 모델 |
| `max-content-bytes` | 예 | - | AI 요청당 UTF-8 바이트 한도. 초과하면 분할 요약 |
| `prompt` | 아니오 | 빈 값 | 인라인 생성 프롬프트. 이것 또는 `prompt-source-file` 입력 |
| `prompt-source-file` | 아니오 | 빈 값 | 호출한 저장소의 프롬프트 파일. 이것 또는 `prompt` 입력 |
| `prompt-template-file` | 아니오 | 빈 값 | 프롬프트 뒤에 추가할 선택적 템플릿 파일 |
| `tag` | 예 | - | 생성 파일명의 태그 |
| `artifact-prefix` | 아니오 | 빈 값 | 한 Workflow에서 작성자별로 동시에 호출할 때 Artifact 이름 앞에 붙일 접두사 |

`start-date` 없이 `end-date`만 입력할 수 없습니다. 기간은 최대 31일까지이며, `start-date`는 `end-date`보다 늦을 수 없습니다.
호출하는 저장소는 인라인 `prompt` 또는 `prompt-source-file`을 사용할 수 있습니다. 프롬프트 파일을 지정하면 Workflow가 호출한 저장소를 Checkout하여 읽습니다.

기본 날짜를 적용한 `start-date`, `end-date`를 출력합니다. `branch-prefix: chronicle-log`를 지정하면 기간에 맞는 `branch-name`도 출력합니다. 예: `chronicle-log-2026-09-01-2026-09-07`, 하루만 처리할 때는 `chronicle-log-2026-09-01`.

### 출력값

| 출력값 | 설명 |
|---|---|
| `start-date` | 계산된 첫 날짜 |
| `end-date` | 계산된 마지막 날짜 |
| `start-date-display` | `YYYY/MM/DD` 형식의 첫 날짜 |
| `end-date-display` | `YYYY/MM/DD` 형식의 마지막 날짜 |
| `branch-name` | 날짜 기반 브랜치 이름. `branch-prefix`가 비어 있으면 빈 값 |
| `has-content` | 생성된 콘텐츠가 있는지 여부 |
| `file-names` | 생성된 파일명 JSON 배열 |

### Workflow 설정

```yaml
jobs:
  generate:
    uses: Sunnymoon724/kozae-forge/.github/workflows/generate-content-from-commits.yml@main
    with:
      runner: self-hosted
      provider: openai
      api-base: https://api.openai.com/v1
      model: gpt-4o-mini
      max-content-bytes: 100000
      start-date: 2026-09-01
      end-date: 2026-09-07
      branch-prefix: chronicle-log
      authors: 홍길동
      exclude-merge-commits: true
      prompt: 커밋 기록을 바탕으로 쉬운 한국어 개발일지를 작성해줘.
      tag: development-log
    secrets:
      API_KEY: ${{ secrets.API_KEY }}
```

프롬프트를 호출한 저장소의 파일로 관리하려면 `prompt` 대신 다음을 입력합니다.

```yaml
      prompt-source-file: Chronicle/templates/daily-development-log-prompt.md
      prompt-template-file: Chronicle/templates/daily-development-log-web.md
```

`tag`가 `development-log`이면 커밋이 있는 날짜마다 `${date}-development-log.md` 파일이 생성됩니다. 모든 파일은 하나의 `generated-content` Artifact에 들어갑니다.
작성자별 병렬 호출 시 `artifact-prefix: member1-`처럼 서로 다른 값을 주면 수집·날짜별·최종 Artifact 이름에 접두사가 붙고, 최종 Artifact는 `member1-generated-content`가 됩니다.

```yaml
- uses: actions/download-artifact@v4
  with:
    name: generated-content
```

## 3. 사용 Action

- `resolve-commit-log-dates`
- `collect-dated-commits` (전체 날짜를 한 번의 checkout에서 처리)
- `prepare-content`
- `request-content`
- `save-content`
- `actions/upload-artifact`
- `actions/download-artifact`
