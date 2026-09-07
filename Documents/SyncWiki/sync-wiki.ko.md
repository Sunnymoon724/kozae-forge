# 위키 동기화

GitHub Wiki는 일반 저장소와 별도의 Git 저장소입니다. 이 기능은 한 저장소의 Wiki를 다른 저장소의 Wiki로 동기화합니다.

```text
SOURCE.wiki.git → DESTINATION.wiki.git
```

## 🧭 목차

- [사용법](#사용법)

## 🚀 사용법

### 1. Token 등록

원본 Wiki를 읽고 대상 Wiki에 push할 수 있는 Token을 준비합니다.

원본 workflow 저장소에 다음 Secret을 등록합니다.

```text
WIKI_SYNC_TOKEN
```

### 2. 원본 Wiki 지정

원본 저장소를 `OWNER/SOURCE-REPOSITORY` 형식으로 지정합니다.

```text
OWNER/SOURCE-REPOSITORY
```

### 3. 대상 Wiki 지정

동기화할 대상 저장소를 `OWNER/DESTINATION-REPOSITORY` 형식으로 지정합니다.

```text
OWNER/DESTINATION-REPOSITORY
```

원본과 대상 저장소에서 Wiki 기능이 활성화되어 있어야 합니다.

### 4. Action 추가

Workflow에 다음 Action을 추가합니다.

```yaml
- name: Sync Wiki
  uses: Sunnymoon724/kozae-forge/actions/sync-wiki@main
  with:
    token: ${{ secrets.WIKI_SYNC_TOKEN }}
    source-repository: OWNER/SOURCE-REPOSITORY
    destination-repository: OWNER/DESTINATION-REPOSITORY
```
