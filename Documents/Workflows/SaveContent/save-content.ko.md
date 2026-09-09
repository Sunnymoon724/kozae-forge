# 콘텐츠 저장

## 1. 처리 방법

1. `generated-content` Artifact를 다운로드합니다.
2. 지정한 디렉토리에 콘텐츠 파일을 저장합니다.
3. 변경사항을 commit합니다.
4. 지정한 브랜치에 push합니다.

## 2. 사용 방법

`generate-commit-log`처럼 먼저 `generated-content` Artifact를 생성하는 Job이 있어야 합니다.

```yaml
jobs:
  save:
    needs: generate
    uses: Sunnymoon724/kozae-forge/.github/workflows/save-content.yml@main
    with:
      file-directory: Documents/Blog
      branch: main
```

`file-directory`의 기본값은 `Documents/Blog`입니다.

## 3. 사용 Action

- `actions/download-artifact`
- `commit-changes`
- `push-changes`
