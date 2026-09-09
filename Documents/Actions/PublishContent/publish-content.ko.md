# publish-content

생성된 콘텐츠 파일을 외부 Webhook으로 업로드하는 GitHub Action입니다.

## 입력값

| 입력값 | 필수 여부 | 기본값 | 설명 |
|---|---|---|---|
| `file-name` | 예 | - | 업로드할 콘텐츠 파일 |
| `publish-url` | 예 | - | POST 요청을 받을 외부 Webhook URL |

## 전송 형식

```json
{
  "date": "2026-09-09",
  "content": "파일 내용"
}
```

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/publish-content@main
  with:
    file-name: generated.md
    publish-url: https://example.com/webhook
```
