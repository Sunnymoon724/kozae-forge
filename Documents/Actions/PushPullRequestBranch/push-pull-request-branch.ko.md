# push-pull-request-branch

다른 실행이 원격 검토 브랜치를 변경하지 않았을 때만 현재 커밋을 push합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `branch` | 예 | - | 원격 검토 브랜치 |

## 출력값

출력값은 없습니다.

## 입력 예시

```yaml
- if: steps.commit.outputs.changed == 'true'
  uses: Sunnymoon724/kozae-forge/actions/push-pull-request-branch@main
  with:
    branch: automation/update
```

## 출력 예시

성공하면 브랜치가 push된 상태입니다.
