# 커밋 로그 생성

## 1. 처리 방법

1. 시간대 기준으로 전날의 시간 범위를 계산합니다.
2. `collect-commits`가 커밋을 텍스트로 수집합니다.
3. `generate-content`가 AI로 원하는 형식의 글을 작성합니다.
4. `output-file`이 있으면 해당 경로에 생성된 글을 저장하고, 없으면 `generated-content` Artifact로 업로드합니다.

이 Workflow는 저장소에 커밋하거나 외부에 게시하지 않습니다.

`target-date`에 지정한 날짜의 00:00부터 다음 날 00:00까지 처리합니다.

## 2. 사용 방법

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
      author: 홍길동
      prompt: 커밋 기록을 바탕으로 한국어 개발일지를 Markdown으로 작성해줘.
      output-file: docs/development-log.md
    secrets:
      API_KEY: ${{ secrets.API_KEY }}
```

`output-file`을 생략한 경우 생성 결과를 후속 Job에서 사용하려면 Artifact를 다운로드합니다.

```yaml
- uses: actions/download-artifact@v4
  with:
    name: generated-content
```

## 3. 사용 Action

- `collect-commits`
- `generate-content`
- `actions/upload-artifact`
