# commit-pull-request-changes

지정한 경로를 검토 브랜치에서 커밋합니다. 원격 push나 PR API 호출은 하지 않습니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `branch` | 예 | - | 검토 브랜치 |
| `paths` | 아니오 | `.` | 스테이징할 경로를 줄바꿈으로 구분 |
| `message` | 예 | - | 커밋 메시지 |

## 출력값

| 출력값 | 설명 |
|---|---|
| `changed` | 커밋을 생성했으면 `true` |

## 입력 예시

```yaml
- id: commit
  uses: Sunnymoon724/kozae-forge/actions/commit-pull-request-changes@main
  with:
    branch: automation/update
    paths: Chronicle/blog
    message: 'docs: update blog'
```

## 출력 예시

```yaml
changed: 'true'
```
