# upload-r2-files

파일을 Cloudflare R2에 올리고 공개 URL과 Markdown 링크를 반환합니다.

## 입력

| 입력 | 필수 | 설명 |
|---|---:|---|
| `file-paths` | 예 | 줄바꿈으로 구분한 파일 경로 |
| `endpoint` | 예 | R2 S3 API 엔드포인트 |
| `bucket` | 예 | R2 버킷 이름 |
| `public-base-url` | 예 | 버킷 공개 URL의 기본 주소 |
| `access-key-id` | 예 | R2 액세스 키 ID |
| `secret-access-key` | 예 | R2 시크릿 액세스 키 |
| `key-prefix` | 아니오 | 객체 경로 앞부분 |

`file-urls`와 `markdown-links` 출력을 반환합니다.
