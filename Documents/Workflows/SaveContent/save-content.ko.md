# 콘텐츠 저장

## 1. 처리 방법

1. `generated-content` Artifact를 다운로드합니다.
2. 지정한 디렉토리에 콘텐츠 파일을 저장합니다.
3. 변경사항을 commit합니다.
4. 지정한 브랜치에 push합니다.

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

  save:
    needs: generate
    uses: Sunnymoon724/kozae-forge/.github/workflows/save-content.yml@main
    with:
      file-directory: Documents/Blog
      branch: main
```

## 3. 사용 Action

- `actions/download-artifact`
- `commit-changes`
- `push-changes`
