# map-document-targets

선택된 Markdown 원본 파일을 대상 경로와 템플릿에 연결합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `mapping-file` | 예 | - | JSON 매핑 파일 |
| `source-files` | 예 | - | 줄바꿈으로 구분한 Markdown 원본 파일 |

## 출력값

| 출력값 | 기본값 | 설명 |
|---|---|---|
| `matrix` | - | `source`, `target`, `template`을 담은 매트릭스 |
| `has-sources` | - | 하나 이상의 대상을 매핑했는지 여부 |
