# collect-commits

지정한 시간대를 기준으로 시작 시간부터 종료 시간까지의 Git 커밋을 수집하는 GitHub Action입니다.

## 입력값

| 입력값 | 필수 여부 | 기본값 | 설명 |
|---|---:|---|---|
| `timezone` | 예 | - | 시간 범위를 해석할 IANA 시간대 |
| `start-time` | 예 | - | 수집 시작 시간 (`YYYY-MM-DD HH:mm`) |
| `end-time` | 예 | - | 수집 종료 시간 (`YYYY-MM-DD HH:mm`) |

## 출력값

| 출력값 | 기본값 | 설명 |
|---|---|---|
| `has-content` | `false` | 커밋이 있으면 `true` |
| `commits` | - | 수집된 커밋 메시지 텍스트 |

## 입력 예시

```yaml
- id: collect
  uses: Sunnymoon724/kozae-forge/actions/collect-commits@main
  with:
    start-time: '2026-09-01 00:00'
    end-time: '2026-09-08 00:00'
    timezone: Asia/Seoul
```

수집된 커밋은 `commits` 출력값으로 다음 단계에 텍스트 형태로 전달됩니다.

## 출력 예시

```yaml
has-content: true
commits: |
  - 로그인 오류 수정 (a1b2c3d)
  - 문서 업데이트 (e4f5g6h)
```
