# Notion 파일 업로드

PNG 또는 GIF 파일을 Notion에 업로드하고 파일 업로드 ID를 반환합니다.

## 입력

| 입력 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `file-paths` | 예 | - | 줄바꿈으로 구분한 PNG 또는 GIF 경로 |
| `notion-token` | 예 | - | Notion 통합 토큰 |

## 출력

| 출력 | 설명 |
|---|---|
| `file-upload-id` | 첫 번째 파일 ID |
| `file-upload-ids` | 업로드한 파일 ID의 JSON 배열 |
