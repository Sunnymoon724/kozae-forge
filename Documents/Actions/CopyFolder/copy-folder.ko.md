# copy-folder

폴더의 전체 내용을 다른 폴더로 복사합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `source-folder` | 예 | - | 원본 폴더 경로 |
| `destination-folder` | 예 | - | 대상 폴더 경로 |
| `delete-extra` | 아니오 | `false` | 원본 폴더에 없는 대상 파일 삭제 여부 |

## 사용 예

```yaml
- uses: Sunnymoon724/kozae-forge/actions/copy-folder@main
  with:
    source-folder: generated-content
    destination-folder: Chronicle/blog
    delete-extra: false
```
