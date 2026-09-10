# sync-files

`rsync`를 사용해 파일을 대상 디렉토리로 동기화하고 제외 목록을 적용하는 GitHub Action입니다.

## 입력값

| 이름 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `exclude-file` | 예 | - | 제외 목록 파일 경로 |
| `destination-directory` | 예 | - | 파일을 동기화할 디렉토리 |

`.git`, `destination-repo`, 미러링 Workflow는 기본적으로 제외됩니다. `rsync --delete`를 사용하므로 대상에만 있는 파일은 삭제될 수 있습니다.

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/sync-files@main
  with:
    exclude-file: Sources/mirror-exclude.list
    destination-directory: destination-repo
```
