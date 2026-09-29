# GitHub webhook Worker

이 Worker는 GitHub App 웹훅을 받아 허용된 저장소의 일반 이슈 댓글만 해당 저장소 워크플로우로 전달합니다.

- PR 댓글은 무시합니다.
- 허용 목록에 없는 저장소는 무시합니다.
- 통과한 이벤트만 `workflow_dispatch`를 호출합니다.
- 실제 작업은 각 저장소의 self-hosted runner 또는 GitHub-hosted runner가 실행합니다.

## 필요한 GitHub App 권한

- Repository permissions: `Actions: Read and write`
- Repository permissions: `Metadata: Read-only`
- Webhook event: `Issue comments`

GitHub App은 이벤트를 받을 저장소에 설치해야 합니다. Worker는 App 설치 토큰을 사용해 해당 저장소의 워크플로우를 실행합니다.

## 필요한 Worker Secret

```bash
wrangler secret put GITHUB_APP_ID
wrangler secret put GITHUB_APP_PRIVATE_KEY
wrangler secret put WEBHOOK_SECRET
```

`GITHUB_APP_PRIVATE_KEY`에는 GitHub App의 PEM 개인키 전체를 넣습니다. 줄바꿈이 포함된 값을 그대로 넣거나 `\\n` 형식으로 넣을 수 있습니다.

## 필요한 Worker 변수

```bash
wrangler deploy
wrangler secret put ALLOWED_REPOSITORIES
```

`ALLOWED_REPOSITORIES`는 쉼표로 구분합니다.

```text
Sunnymoon724/project-durian,Sunnymoon724/another-repository
```

기본 워크플로우 파일 이름은 `mirror-issues.yml`입니다.

```bash
wrangler secret put DEFAULT_WORKFLOW
```

저장소마다 다른 워크플로우를 사용하면 `WORKFLOW_MAP` 환경 변수를 JSON으로 설정합니다.

```json
{"Sunnymoon724/project-durian":"mirror-public-issues.yml"}
```

## 대상 저장소 워크플로우

Worker가 호출하는 워크플로우는 `workflow_dispatch`를 지원해야 합니다. 입력 이름은 다음과 같아야 합니다.

```yaml
on:
  workflow_dispatch:
    inputs:
      source-issue-number:
        required: true
        type: string
```

Worker는 댓글이 달린 이슈 번호를 `source-issue-number`로 전달합니다.

## GitHub App 웹훅 설정

Worker를 배포한 뒤 생성된 HTTPS URL을 GitHub App의 webhook URL로 등록합니다.

- Content type: `application/json`
- Secret: `WEBHOOK_SECRET`에 등록한 동일한 값
- Event: `Issue comments`

## 로컬 테스트와 배포

```bash
npx wrangler dev
npx wrangler deploy
```

비밀값은 저장소 파일이나 `wrangler.toml`에 기록하지 않습니다.
