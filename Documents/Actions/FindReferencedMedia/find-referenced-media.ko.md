# find-referenced-media

선택한 Markdown 파일의 이미지 참조에서 존재하는 로컬 PNG/GIF 파일을 찾습니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `source-files` | 예 | - | 줄바꿈으로 구분한 Markdown 파일 |
| `media-directory` | 예 | - | 로컬 이미지 폴더 |

## 출력값

| 출력값 | 설명 |
|---|---|
| `image-files` | 줄바꿈으로 구분한 이미지 파일 경로 |

## 입력 예시

```yaml
- id: media
  uses: Sunnymoon724/kozae-forge/actions/find-referenced-media@main
  with:
    source-files: ${{ steps.collect-logs.outputs.source-files }}
    media-directory: Chronicle/static/media
```

## 출력 예시

```yaml
image-files: Chronicle/static/media/2026-10-19-01.png
```
