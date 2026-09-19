# save-content

인라인 콘텐츠 또는 기존 파일 하나를 대상 경로에 저장합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `file-path` | 예 | - | 대상 파일 경로 |
| `content` | 아니오 | 빈 값 | 저장할 인라인 콘텐츠 |
| `source-file` | 아니오 | 빈 값 | 복사할 기존 파일 |

`content`와 `source-file` 중 정확히 하나를 제공합니다.

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/save-content@main
  with:
    file-path: Chronicle/blog/article.md
    source-file: generated-content/article.md
```
