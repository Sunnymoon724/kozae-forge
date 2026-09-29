# 저장소 미러링

원본 저장소의 `main` 최신 파일 상태를 제외 목록에 따라 대상 저장소로 동기화합니다. 대상 저장소는 과거 Git 이력을 보관하는 미러가 아니라 최신 상태를 보여주는 공개용 드라이브처럼 사용합니다.

## 1. 처리 방법

원본 저장소의 최신 파일을 확인하고 대상 저장소를 얕게 Clone한 뒤, 필요한 LFS 객체와 파일만 동기화합니다. 원본에 없는 대상 파일은 제외 목록을 제외하고 삭제하며, 변경사항이 있을 때만 commit하고 대상 저장소의 `main`에 push합니다.

## 2. 사용 방법

### 토큰 등록

원본 저장소에 `DESTINATION_REPO_TOKEN` Actions Secret을 등록합니다.

Token은 복사할 대상 저장소에 push 권한이 있어야 합니다.

```text
Settings → Secrets and variables → Actions
```

Secret 이름:

```text
DESTINATION_REPO_TOKEN
```

호출하는 저장소의 Workflow에서 이 Secret을 재사용 Workflow에 전달합니다.

```yaml
secrets:
  DESTINATION_REPO_TOKEN: ${{ secrets.DESTINATION_REPO_TOKEN }}
```

### 제외 목록 작성

원본 저장소 안에 제외 목록 파일을 만듭니다.

```text
Sources/mirror-exclude.list
```

공개 저장소에 복사하지 않을 파일이나 폴더를 한 줄에 하나씩 작성합니다.

작성 형식:

```text
path/to/excluded-directory/
path/to/private-file.ext
*.local
```

### 대상 저장소 지정

복사할 저장소를 `OWNER/DESTINATION-REPOSITORY` 형식으로 지정합니다.

형식:

```text
OWNER/DESTINATION-REPOSITORY
```

### 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `runner` | 아니오 | `ubuntu-latest` | 미러링 Job에 사용할 Runner 레이블 |
| `destination-repository` | 예 | - | `OWNER/REPOSITORY` 형식의 대상 저장소 |
| `exclude-file` | 예 | - | 원본 저장소의 제외 목록 파일 경로 |

### Workflow 설정

원본 저장소에 `.github/workflows/mirror-repository.yml`을 만들고 다음을 작성합니다.

```yaml
name: Mirror repository

on:
  push:
    branches:
      - main

jobs:
  mirror:
    uses: Sunnymoon724/kozae-forge/.github/workflows/mirror-repository.yml@main
    with:
      runner: self-hosted
      destination-repository: OWNER/DESTINATION-REPOSITORY
      exclude-file: Sources/mirror-exclude.list
    secrets:
      DESTINATION_REPO_TOKEN: ${{ secrets.DESTINATION_REPO_TOKEN }}
```

Workflow는 대상 저장소에 접근하는 Action에 `DESTINATION_REPO_TOKEN`을 전달합니다. `configure-lfs-remote`는 원격 URL만 구성하며, `upload-git-lfs-objects`와 `push-changes`가 `token` 입력값으로 Token을 받습니다. 대상 저장소의 과거 이력은 Clone하지 않으며, LFS도 `main`에서 사용하는 객체만 업로드합니다.

self-hosted Runner 안정성을 위해 Git LFS 업로드는 기본적으로 한 번에 최대 다섯 개를 전송하며, 객체별로 최대 세 번 재시도합니다.
GitHub 인증은 `github.com`에만 적용하며, presigned S3 업로드 URL에는 GitHub 인증 헤더를 보내지 않습니다.

```yaml
- uses: Sunnymoon724/kozae-forge/actions/configure-lfs-remote@main
  with:
    repository-directory: .
    repository: OWNER/REPOSITORY

- uses: Sunnymoon724/kozae-forge/actions/push-changes@main
  with:
    token: ${{ secrets.DESTINATION_REPO_TOKEN }}
    destination-directory: destination-repo
    branch: main
```

## 3. 사용 Action

- `verify-repository`
- `configure-lfs-remote`
- `upload-git-lfs-objects`
- `copy-folder`
- `commit-changes`
- `push-changes`
