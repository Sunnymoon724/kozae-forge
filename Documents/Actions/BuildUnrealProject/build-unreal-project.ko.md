# Unreal 프로젝트 빌드

Windows Runner에 설치된 Unreal Engine으로 Unreal 프로젝트를 빌드합니다. 프로젝트 파일과 엔진 빌드 도구가 있는지 확인하고, 선택에 따라 Unreal Editor 실행 여부도 검사한 뒤 지정한 대상을 빌드합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `engine-root` | 예 | - | 설치된 Unreal Engine의 절대 경로 |
| `project-file` | 예 | - | `.uproject` 경로. 절대 경로 또는 workspace 기준 상대 경로 |
| `target` | 예 | - | 빌드 대상. 예: `RabbitEditor` |
| `platform` | 아니오 | `Win64` | Unreal 빌드 플랫폼 |
| `configuration` | 아니오 | `Development` | Unreal 빌드 구성 |
| `check-editor-running` | 아니오 | `true` | `UnrealEditor.exe`가 실행 중이면 실패 처리 |

## 사용 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/build-unreal-project@main
  with:
    engine-root: C:\Program Files\Epic Games\UE_5.8
    project-file: Rabbit/Rabbit.uproject
    target: RabbitEditor
    platform: Win64
    configuration: Development
```

## 참고 사항

- Unreal Engine이 설치된 Windows Runner가 필요합니다.
- 사용 전에 호출하는 Workflow에서 저장소를 Checkout해야 합니다.
- `engine-root`와 `project-file` 경로에는 큰따옴표를 넣을 수 없습니다.
- 빌드에는 `-WaitMutex`, `-NoHotReload` 옵션을 사용합니다.
