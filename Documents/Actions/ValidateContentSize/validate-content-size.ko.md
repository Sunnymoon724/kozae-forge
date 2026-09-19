# 콘텐츠 크기 검증

콘텐츠가 지정한 바이트 제한을 초과하면 실패합니다.

## 입력값

| 입력값 | 필수 | 설명 |
|---|---:|---|
| `content` | 예 | 검증할 콘텐츠 |
| `max-content-bytes` | 예 | 허용할 최대 콘텐츠 바이트 수 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/validate-content-size@main
  with:
    content: 원본 콘텐츠
    max-content-bytes: 100000
```
