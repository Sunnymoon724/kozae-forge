const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');

for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
}

function required(name) {
  const value = process.env[`INPUT_${name}`]?.trim();
  if (!value) throw new Error(`Input "${name.replaceAll('_', '-')}" is required.`);
  if (value.includes('"')) throw new Error(`Input "${name.replaceAll('_', '-')}" must not contain double quotes.`);
  return value;
}

function run() {
  if (process.platform !== 'win32') {
    throw new Error('Build Unreal project requires a Windows runner with Unreal Engine installed.');
  }

  const engineRoot = path.resolve(required('engine_root'));
  const workspace = process.env.GITHUB_WORKSPACE || process.cwd();
  const projectFile = path.resolve(workspace, required('project_file'));
  const target = required('target');
  const platform = process.env.INPUT_PLATFORM?.trim() || 'Win64';
  const configuration = process.env.INPUT_CONFIGURATION?.trim() || 'Development';
  const checkEditorRunning = (process.env.INPUT_CHECK_EDITOR_RUNNING || 'true').trim().toLowerCase();
  const buildScript = path.join(engineRoot, 'Engine', 'Build', 'BatchFiles', 'Build.bat');

  if (!/^[A-Za-z0-9_.-]+$/.test(target)) throw new Error('Input "target" contains unsupported characters.');
  if (!/^[A-Za-z0-9_.-]+$/.test(platform)) throw new Error('Input "platform" contains unsupported characters.');
  if (!/^[A-Za-z0-9_.-]+$/.test(configuration)) throw new Error('Input "configuration" contains unsupported characters.');
  if (!['true', 'false'].includes(checkEditorRunning)) {
    throw new Error('Input "check-editor-running" must be "true" or "false".');
  }

  for (const file of [projectFile, buildScript]) {
    if (!fs.existsSync(file)) throw new Error(`Required build file was not found: ${file}`);
  }

  if (checkEditorRunning === 'true') {
    const editor = spawnSync('tasklist.exe', ['/FI', 'IMAGENAME eq UnrealEditor.exe', '/NH'], {encoding: 'utf8'});
    if (editor.error) throw editor.error;
    if (editor.status !== 0) throw new Error(editor.stderr || 'Could not check whether Unreal Editor is running.');
    if (editor.stdout.includes('UnrealEditor.exe')) {
      throw new Error('Close Unreal Editor on the runner before building the project.');
    }
  }

  const command = `""${buildScript}" ${target} ${platform} ${configuration} -Project="${projectFile}" -WaitMutex -NoHotReload"`;
  console.log(`Building ${projectFile} (${target} ${platform} ${configuration})`);
  const result = spawnSync('cmd.exe', ['/d', '/s', '/c', command], {stdio: 'inherit'});
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

try {
  run();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
