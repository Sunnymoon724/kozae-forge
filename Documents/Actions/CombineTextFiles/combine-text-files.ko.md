# 텍스트 파일 합치기

선택한 UTF-8 텍스트 파일을 AI 요약 요청 한 번에 사용할 수 있도록 하나의 파일로 합치는 GitHub Action입니다. 파일명에 날짜나 `.md` 확장자가 없어도 됩니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `directory` | 예 | - | 텍스트 파일이 있는 디렉터리 |
| `file-names` | 예 | - | 비어 있지 않은 텍스트 파일명 JSON 배열 |
| `output-file` | 아니오 | `.generated-content/combined-content.md` | 합친 파일의 경로 |

## 출력값

| 출력값 | 기본값 | 설명 |
|---|---|---|
| `content-file` | - | 합친 콘텐츠 파일의 경로 |

## 입력 예시

```yaml
- id: combined
  uses: Sunnymoon724/kozae-forge/actions/combine-text-files@main
  with:
    directory: .generated-content
    file-names: '["planning.txt","implementation.md"]'
```

## 출력 예시

```yaml
content-file: .generated-content/combined-content.md
```
