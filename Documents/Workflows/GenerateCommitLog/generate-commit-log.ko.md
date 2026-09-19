# 커밋 로그 생성

## 1. 처리 방법

1. 시간대 기준으로 전날의 시간 범위를 계산합니다.
2. `collect-git-commits`가 커밋을 텍스트로 수집합니다.
3. `prepare-content`, `validate-content-size`, `request-content`가 AI로 원하는 형식의 글을 작성합니다.
4. `save-content`가 생성된 글을 Job의 임시 작업 공간에 `${date}-${tag}.md` 파일명으로 저장합니다.
5. 생성된 파일을 항상 `generated-content` Artifact로 업로드합니다.

이 Workflow는 저장소에 파일을 영구 저장하거나 커밋하지 않습니다. 후속 Job에서 작업 공간에 파일을 복원하려면 `save-content` Action을 사용하고, 저장소에 반영하려면 별도로 commit과 push를 수행해야 합니다.

`target-date`에 지정한 날짜의 00:00부터 다음 날 00:00까지 처리합니다.

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
| `target-date` | 예 | - | 로그를 생성할 날짜 |
| `authors` | 아니오 | 빈 값 | 커밋 작성자 필터 |
| `provider` | 예 | - | AI Provider |
| `api-base` | 예 | - | AI API 기본 URL |
| `model` | 예 | - | AI 모델 |
| `max-content-bytes` | 예 | - | 입력 콘텐츠 최대 크기 |
| `prompt` | 예 | - | 콘텐츠 생성 프롬프트 |
| `tag` | 예 | - | 생성 파일명의 태그 |

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
      target-date: 2026-09-08
      authors: 홍길동
      prompt: 커밋 기록을 바탕으로 한국어 개발일지를 Markdown으로 작성해줘.
      tag: development-log
    secrets:
      API_KEY: ${{ secrets.API_KEY }}
```

`tag`가 `development-log`이면 Job 작업 공간의 루트에 `${target-date}-development-log.md` 파일이 생성됩니다. 생성 결과는 항상 `generated-content` Artifact로 제공되며, 다음 Job에서 필요한 대상 디렉터리로 다운로드해야 합니다.

```yaml
- uses: actions/download-artifact@v4
  with:
    name: generated-content
```

## 3. 사용 Action

- `collect-git-commits`
- `prepare-content`
- `validate-content-size`
- `request-content`
- `save-content`
- `actions/upload-artifact`
