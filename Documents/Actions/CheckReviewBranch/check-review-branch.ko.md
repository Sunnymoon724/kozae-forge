# check-review-branch

`.github/review-config.json`에서 현재 브랜치의 검토 활성화 여부를 확인합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `config-path` | 아니오 | `.github/review-config.json` | 저장소 기준 검토 설정 파일 경로 |
| `branch` | 아니오 | `GITHUB_REF_NAME` | 확인할 브랜치 |

설정 파일에는 `branches`라는 문자열 배열이 있어야 합니다.

## 출력값

| 출력값 | 설명 |
|---|---|
| `branch` | 확인한 브랜치 |
| `enabled` | 해당 브랜치의 검토 활성화 여부 |

## 입력 예시

```yaml
- id: config
  uses: Sunnymoon724/kozae-forge/actions/check-review-branch@main
```

## 설정 예시

```json
{"branches":["develop","main"]}
```
