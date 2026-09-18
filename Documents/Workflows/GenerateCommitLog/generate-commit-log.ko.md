# 커밋 로그 생성

## 1. 처리 방법

1. 시간대 기준으로 전날의 시간 범위를 계산합니다.
2. `collect-commits`가 커밋을 텍스트로 수집합니다.
3. `prepare-content`, `validate-content-size`, `request-content`가 AI로 원하는 형식의 글을 작성합니다.
4. `write-content`가 생성된 글을 Job의 임시 작업 공간에 `${date}-${tag}.md` 파일명으로 저장합니다.
5. 생성된 파일을 항상 `generated-content` Artifact로 업로드합니다.

이 Workflow는 저장소에 파일을 영구 저장하거나 커밋하지 않습니다. 후속 Job에서 작업 공간에 파일을 복원하려면 `save-content` Action을 사용하고, 저장소에 반영하려면 별도로 commit과 push를 수행해야 합니다.

`target-date`에 지정한 날짜의 00:00부터 다음 날 00:00까지 처리합니다.

## 2. 사용 방법

### Token 등록

AI Provider에 필요한 `API_KEY` Actions Secret을 등록합니다.

### 인자 설정

아래 예시와 같이 Workflow 인자를 설정합니다.

### Workflow configuration

```yaml
jobs:
  generate:
    uses: Sunnymoon724/kozae-forge/.github/workflows/generate-commit-log.yml@main
    with:
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

- `collect-commits`
- `prepare-content`
- `validate-content-size`
- `request-content`
- `save-content`
- `actions/upload-artifact`
