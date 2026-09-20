# 콘텐츠 요청

OpenAI 호환 API에 생성된 콘텐츠를 요청합니다.

요청을 보내기 전에 모든 필수 입력값을 검증하며, 누락된 값이 있으면 해당 입력값 이름을 오류로 표시합니다.

## 입력값

| 입력값 | 필수 | 설명 |
|---|---:|---|
| `provider` | 예 | AI 제공자 이름 |
| `api-base` | 예 | OpenAI 호환 API 기본 URL |
| `model` | 예 | AI 모델 이름 |
| `prompt` | 예 | 생성 지침 |
| `content` | 예 | 입력 콘텐츠 |
| `api-key` | 예 | AI 제공자 API 키 |

## 출력값

| 출력값 | 설명 |
|---|---|
| `content` | 생성된 콘텐츠 |

## 입력 예시

```yaml
- id: generated
  uses: Sunnymoon724/kozae-forge/actions/request-content@main
  with:
    provider: openai
    api-base: https://api.openai.com/v1
    model: gpt-4o-mini
    prompt: Markdown 요약을 작성합니다.
    content: 원본 콘텐츠
    api-key: ${{ secrets.API_KEY }}
```

## 출력 예시

```yaml
content: 생성된 Markdown 콘텐츠
```
