# create-pull-request

생성된 콘텐츠를 다운로드하고 변경사항으로 Pull Request를 생성하는 GitHub Action입니다.

이 Action을 사용하기 전에 호출하는 Workflow에서 저장소를 checkout해야 합니다.

## 입력값

| 입력값 | 필수 여부 | 기본값 | 설명 |
|---|---:|---|---|
| `token` | 예 | - | Pull Request 생성에 사용할 GitHub 토큰 |
| `artifact-name` | 예 | - | 생성 파일이 포함된 Artifact 이름 |
| `branch` | 아니오 | `automation/update-content` | Pull Request에 사용할 브랜치 |
| `commit-message` | 아니오 | `docs: update generated content` | commit 메시지 |
| `title` | 아니오 | `docs: update generated content` | Pull Request 제목 |
| `body` | 아니오 | 생성 콘텐츠 검토 안내 | Pull Request 본문 |
| `labels` | 아니오 | 빈 값 | Pull Request에 지정할 쉼표 구분 label 목록 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/create-pull-request@main
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    artifact-name: chronicle-pages
    branch: automation/sync-wiki
    commit-message: 'docs: sync wiki pages'
    title: 'docs: sync wiki pages'
    body: |
      This pull request contains generated Chronicle pages.
    labels: documentation, automated
```
