# 콘텐츠 준비

인라인 콘텐츠와 선택적 소스·템플릿 파일을 결합합니다.

`source-file`만 제공하면 파일을 수정 없이 읽습니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `content` | 아니오 | 빈 값 | 인라인 콘텐츠 |
| `source-file` | 아니오 | 빈 값 | 인라인 콘텐츠를 대체할 파일 |
| `template-file` | 아니오 | 빈 값 | 콘텐츠 뒤에 추가할 템플릿 파일 |

## 출력값

| 출력값 | 설명 |
|---|---|
| `content` | 준비된 콘텐츠 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/prepare-content@main
  with:
    source-file: source.md
```

## 출력 예시

```yaml
content: 준비된 원본 콘텐츠
```
