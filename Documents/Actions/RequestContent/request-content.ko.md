# 콘텐츠 요청

OpenAI 호환 API에 생성된 콘텐츠를 요청합니다.

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
