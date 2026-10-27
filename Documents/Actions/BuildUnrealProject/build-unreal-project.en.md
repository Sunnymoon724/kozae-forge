# build-unreal-project

Builds an Unreal project with the Unreal Engine installation on a Windows runner. It checks the project and engine build script, optionally checks for a running Unreal Editor, then builds the selected target.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `engine-root` | Yes | - | Absolute path to the installed Unreal Engine directory |
| `project-file` | Yes | - | `.uproject` path, absolute or relative to the workspace |
| `target` | Yes | - | Build target, such as `RabbitEditor` |
| `platform` | No | `Win64` | Unreal build platform |
| `configuration` | No | `Development` | Unreal build configuration |
| `check-editor-running` | No | `true` | Fail if `UnrealEditor.exe` is running |

## Usage

```yaml
- uses: Sunnymoon724/kozae-forge/actions/build-unreal-project@main
  with:
    engine-root: C:\Program Files\Epic Games\UE_5.8
    project-file: Rabbit/Rabbit.uproject
    target: RabbitEditor
    platform: Win64
    configuration: Development
```

## Notes

- This Action requires a Windows runner with the selected Unreal Engine installed.
- The calling Workflow must check out the repository before using this Action.
- `engine-root` and `project-file` paths must not contain double quote characters.
- The build runs with `-WaitMutex` and `-NoHotReload`.
