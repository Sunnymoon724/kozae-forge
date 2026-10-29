# 날짜별 커밋 수집

한 번 체크아웃한 저장소에서 여러 날짜의 커밋 메시지를 수집합니다. 커밋이 있는 날짜마다 `.commit-data/YYYY-MM-DD.txt`를 만듭니다. 전체 기간에 커밋이 없으면 Artifact 업로드를 위해 `.commit-data/no-commits.txt`를 만듭니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `dates` | 예 | - | `YYYY-MM-DD` 날짜 JSON 배열 |
| `timezone` | 예 | - | 하루 경계를 계산할 IANA 시간대 |
| `authors` | 아니오 | 빈 값 | 쉼표로 구분한 Git 작성자 필터 |
| `exclude-merge-commits` | 아니오 | `false` | 병합 커밋 제외 |

## 출력값

| 출력값 | 기본값 | 설명 |
|---|---|---|
| `has-content` | - | 날짜 중 커밋이 있는 날이 있는지 여부 |

## 입력 예시

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0
- id: commits
  uses: Sunnymoon724/kozae-forge/actions/collect-dated-commits@main
  with:
    dates: '["2026-10-01","2026-10-02"]'
    timezone: Asia/Seoul
    authors: KoZae_home,KoZae_out_1
    exclude-merge-commits: 'true'
```

## 출력 예시

```yaml
has-content: 'true'
```
