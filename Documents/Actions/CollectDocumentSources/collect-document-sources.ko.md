# collect-document-sources

매핑된 디렉터리 또는 Git 변경 범위에서 Markdown 원본 파일을 수집합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `mapping-file` | 예 | - | JSON 매핑 파일 |
| `sync-mode` | 예 | - | `changed` 또는 `full` |
| `changed-files` | 아니오 | 빈 값 | 변경 파일 목록 |
| `base-ref` | 조건부 | 빈 값 | 비교 기준 |
| `head-ref` | 아니오 | `HEAD` | 비교 대상 |

## 출력값

| 출력값 | 기본값 | 설명 |
|---|---|---|
| `source-files` | - | 줄바꿈으로 구분한 Markdown 파일 경로 |
