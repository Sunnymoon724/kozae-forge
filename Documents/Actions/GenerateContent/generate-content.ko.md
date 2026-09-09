# generate-content

입력된 텍스트를 OpenAI 호환 Chat Completions API로 전달해 원하는 형식의 콘텐츠를 생성하는 GitHub Action입니다.

## 입력값

| 이름 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `date` | 예 | - | 기본 출력 파일명에 사용할 날짜 |
| `provider` | 예 | - | AI 제공자 이름 (`openai` 또는 `openai-compatible`) |
| `api-base` | 예 | - | AI API 기본 URL |
| `model` | 예 | - | 사용할 모델명 |
| `content` | 조건부 | 빈 값 | 직접 전달할 원문 |
| `source-file` | 조건부 | 빈 값 | 원문이 들어 있는 파일 |
| `prompt` | 예 | - | 생성 지침 |
| `output-file` | 아니오 | `{date}-development-log.md` | 결과 파일 경로 또는 파일명 |
| `api-key` | 예 | - | AI API 키 |

`content`와 `source-file` 중 하나를 사용합니다. `source-file`이 지정되면 해당 파일을 우선 사용합니다.

## 출력값

| 출력값 | 설명 |
|---|---|
| `file-name` | 생성된 파일 경로 |

## 입력 예시

```yaml
- id: generate
  uses: Sunnymoon724/kozae-forge/actions/generate-content@main
  with:
    date: 2026-09-09
    provider: openai
    api-base: https://api.openai.com/v1
    model: gpt-4o-mini
    content: ${{ steps.collect.outputs.commits }}
    prompt: 커밋 기록을 바탕으로 한국어 개발일지를 Markdown으로 작성해줘.
    output-file: 2026-09-08-development-log.md
    api-key: ${{ secrets.API_KEY }}
```

## 출력 예시

```yaml
file-name: 2026-09-08-development-log.md
```
