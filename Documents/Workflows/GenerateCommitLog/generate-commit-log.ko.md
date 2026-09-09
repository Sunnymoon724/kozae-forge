# 커밋 로그 생성

## 1. 처리 방법

1. 시간대 기준으로 전날의 시간 범위를 계산합니다.
2. `collect-commits`가 커밋을 텍스트로 수집합니다.
3. `generate-content`가 AI로 원하는 형식의 글을 작성합니다.
4. 생성된 글을 `generated-content` Artifact로 업로드합니다.

이 Workflow는 파일 저장이나 외부 게시를 직접 수행하지 않습니다.

## 2. 사용 방법

```yaml
jobs:
  generate:
    uses: Sunnymoon724/kozae-forge/.github/workflows/generate-commit-log.yml@main
    with:
      api-url: https://api.openai.com/v1/chat/completions
      model: gpt-4o-mini
      prompt: 커밋 기록을 바탕으로 한국어 개발일지를 Markdown으로 작성해줘.
    secrets:
      AI_API_KEY: ${{ secrets.AI_API_KEY }}
```

생성 결과를 후속 Job에서 사용하려면 Artifact를 다운로드합니다.

```yaml
- uses: actions/download-artifact@v4
  with:
    name: generated-content
```

## 3. 사용 Action

- `collect-commits`
- `generate-content`
- `actions/upload-artifact`
