# 저장소 미러링

한 저장소의 변경사항을 제외 목록에 따라 대상 저장소로 동기화합니다.

## 사용법

### 1. Token 등록

원본 저장소에 `PUBLIC_REPO_TOKEN` Actions Secret을 등록합니다.

Token은 복사할 대상 저장소에 push 권한이 있어야 합니다.

```text
Settings → Secrets and variables → Actions
```

Secret 이름:

```text
PUBLIC_REPO_TOKEN
```

### 2. 제외 목록 작성

원본 저장소 안에 제외 목록 파일을 만듭니다.

```text
Sources/public-exclude.list
```

공개 저장소에 복사하지 않을 파일이나 폴더를 한 줄에 하나씩 작성합니다.

작성 형식:

```text
path/to/excluded-directory/
path/to/private-file.ext
*.local
```

### 3. 대상 저장소 지정

복사할 저장소를 `OWNER/DESTINATION-REPOSITORY` 형식으로 지정합니다.

형식:

```text
OWNER/DESTINATION-REPOSITORY
```

### 4. Workflow 추가

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
      destination-repository: OWNER/DESTINATION-REPOSITORY
      exclude-file: Sources/public-exclude.list
    secrets:
      PUBLIC_REPO_TOKEN: ${{ secrets.PUBLIC_REPO_TOKEN }}
```
