# notify-webhook

알림 Webhook으로 HTTP 요청을 전송합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `url` | 예 | - | Webhook URL |
| `method` | 아니오 | `POST` | HTTP 메서드 |
| `headers` | 아니오 | `{"Content-Type":"application/json"}` | HTTP 헤더 JSON 객체 |
| `body` | 예 | - | HTTP 요청 본문 |

## 사용 예

```yaml
- uses: Sunnymoon724/kozae-forge/actions/notify-webhook@main
  with:
    url: ${{ secrets.NOTIFY_WEBHOOK_URL }}
    headers: '{"Content-Type":"application/json"}'
    body: '{"message":"빌드가 완료되었습니다"}'
```
