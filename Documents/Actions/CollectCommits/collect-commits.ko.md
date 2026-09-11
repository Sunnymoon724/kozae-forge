# collect-commits

지정한 시간대의 커밋에서 실제 파일 변경(diff)을 수집하는 GitHub Action입니다.

## 입력값

| 입력값 | 필수 여부 | 기본값 | 설명 |
|---|---:|---|---|
| `author` | 아니오 | 빈 값 | 작성자 이름 또는 이메일 필터. 비어 있으면 모든 작성자의 커밋 수집 |
| `timezone` | 예 | - | 시간 범위를 해석할 IANA 시간대 |
| `start-time` | 예 | - | 수집 시작 시간 (`YYYY-MM-DD HH:mm`) |
| `end-time` | 예 | - | 수집 종료 시간 (`YYYY-MM-DD HH:mm`) |

## 출력값

| 출력값 | 기본값 | 설명 |
|---|---|---|
| `has-content` | `false` | 커밋이 있으면 `true` |
| `changes-file` | - | 수집된 Git diff 파일 경로 |

## 입력 예시

```yaml
- id: collect
  uses: Sunnymoon724/kozae-forge/actions/collect-commits@main
  with:
    start-time: '2026-09-01 00:00'
    end-time: '2026-09-08 00:00'
    timezone: Asia/Seoul
    author: 홍길동
```

수집된 변경 내용은 임시 patch 파일에 저장됩니다. 다음 단계의 `source-file` 입력에 `changes-file` 출력값을 전달합니다. 이렇게 하면 큰 diff로 인한 GitHub Actions 출력 크기 제한을 피할 수 있습니다.

## 출력 예시

```yaml
has-content: true
changes-file: /tmp/kozae-forge-git-diff.patch
```
