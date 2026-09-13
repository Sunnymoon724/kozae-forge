# 커밋 로그 생성

## 1. 처리 방법

1. 시간대 기준으로 전날의 시간 범위를 계산합니다.
2. `collect-commits`가 커밋을 텍스트로 수집합니다.
3. `generate-content`가 AI로 원하는 형식의 글을 작성합니다.
4. 생성된 글을 Job의 임시 작업 공간에 `${date}-${tag}.md` 파일명으로 생성합니다.
5. 생성된 파일을 항상 `generated-content` Artifact로 업로드합니다.

이 Workflow는 저장소에 파일을 영구 저장하거나 커밋하지 않습니다. 후속 Job에서 작업 공간에 파일을 복원하려면 `save-content` Action을 사용하고, 저장소에 반영하려면 별도로 commit과 push를 수행해야 합니다.

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
      output-directory: Chronicle/blog
      tag: development-log
    secrets:
      API_KEY: ${{ secrets.API_KEY }}
```

`output-directory`가 `Chronicle/blog`이고 `tag`가 `development-log`이면 결과 파일은 `${target-date}-development-log.md`로 생성됩니다. 생성 결과는 항상 `generated-content` Artifact로 제공됩니다.

```yaml
- uses: actions/download-artifact@v4
  with:
    name: generated-content
```

## 3. 사용 Action

- `collect-commits`
- `generate-content`
- `actions/upload-artifact`
