# copy-file

파일 하나를 대상 경로로 복사합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `source-file` | 예 | - | 원본 파일 경로 |
| `destination-file` | 예 | - | 대상 파일 경로 |

## 사용 예

```yaml
- uses: Sunnymoon724/kozae-forge/actions/copy-file@main
  with:
    source-file: generated.md
    destination-file: Chronicle/blog/generated.md
```
