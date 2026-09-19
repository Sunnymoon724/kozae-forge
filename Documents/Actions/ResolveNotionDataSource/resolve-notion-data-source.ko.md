# resolve-notion-data-source

Notion 데이터베이스 URL에서 데이터 소스 ID를 구합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `source-url` | 예 | - | Notion 데이터베이스 URL |
| `notion-token` | 예 | - | Notion 통합 토큰 |

## 출력값

| 출력값 | 기본값 | 설명 |
|---|---|---|
| `data-source-id` | - | 조회된 데이터 소스 ID |

## 입력 예시

```yaml
- id: data-source
  uses: Sunnymoon724/kozae-forge/actions/resolve-notion-data-source@main
  with:
    source-url: ${{ vars.NOTION_DATABASE_URL }}
    notion-token: ${{ secrets.NOTION_TOKEN }}
```

## 출력 예시

```yaml
data-source-id: 12345678-1234-1234-1234-123456789abc
```
