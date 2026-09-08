# 일일 개발일지

전날의 커밋을 수집하고, 글을 생성한 뒤 선택적으로 파일 저장 또는 외부 게시를 수행하는 재사용 Workflow입니다.

## 처리 흐름

```text
collect-commits
  ↓
generate-content
  ├─ write-content   (선택)
  └─ publish-content (선택)
```

- `collect-commits`: 전날의 커밋을 수집합니다.
- `generate-content`: 수집된 내용을 개발일지 형식의 Markdown으로 만듭니다.
- `write-content`: 생성된 글을 지정한 경로에 저장하고 커밋·푸시합니다.
- `publish-content`: 생성된 글을 외부 Webhook으로 전송합니다.

## 사용법

원본 저장소의 Workflow에 다음 작업을 추가합니다.

```yaml
name: Daily development log

on:
  schedule:
    - cron: '5 15 * * *'
  workflow_dispatch:

jobs:
  daily-log:
    uses: Sunnymoon724/kozae-forge/.github/workflows/daily-development-log.yml@main
    with:
      file-directory: Documents/Blog
      api-url: https://api.openai.com/v1/chat/completions
      model: gpt-4o-mini
      prompt: 커밋 기록을 바탕으로 한국어 개발일지를 Markdown으로 작성합니다.
    secrets:
      AI_API_KEY: ${{ secrets.AI_API_KEY }}
      branch: main
      timezone: Asia/Seoul
      save-file: true
      publish: false
```

파일 저장과 외부 게시 여부를 선택할 수 있습니다.

```yaml
with:
  file-directory: Documents/Blog
  save-file: true
  publish: false
  api-url: https://api.openai.com/v1/chat/completions
  model: gpt-4o-mini
  prompt: 커밋 기록을 바탕으로 한국어 개발일지를 Markdown으로 작성합니다.
```

파일 저장 없이 외부 게시만 할 수도 있습니다.

```yaml
with:
  save-file: false
  publish: true
  publish-url: https://example.com/webhook
```

`publish`를 활성화하면 `publish-url`에 지정한 외부 Webhook으로 다음 JSON을 전송합니다.

```json
{
  "date": "2026-09-08",
  "content": "생성된 Markdown 내용"
}
```

`cron`은 UTC 기준입니다. 위 설정은 한국 시간 매일 00:05에 실행됩니다.

전날 커밋이 없으면 글을 생성하지 않습니다. 같은 파일이 이미 있으면 Git에 새로운 변경사항이 없으므로 커밋하지 않습니다.

기본 생성 파일:

```text
Documents/Blog/YYYY-MM-DD-development-log.md
```

현재 `generate-content`는 수집된 커밋 메시지를 Markdown 형식으로 정리합니다. AI를 이용한 자연어 요약은 해당 Action에 연결할 수 있도록 단계가 분리되어 있습니다.
