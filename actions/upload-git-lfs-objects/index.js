const {spawnSync} = require('node:child_process');

for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) {
    process.env[name.replaceAll('-', '_')] = value;
  }
}

const authorization = Buffer.from(`x-access-token:${process.env.INPUT_TOKEN}`).toString('base64');
const environment = {...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'Never', GIT_CONFIG_COUNT: '3', GIT_CONFIG_KEY_0: 'http.https://github.com/.extraheader', GIT_CONFIG_VALUE_0: `Authorization: Basic ${authorization}`, GIT_CONFIG_KEY_1: 'lfs.concurrenttransfers', GIT_CONFIG_VALUE_1: process.env.INPUT_CONCURRENT_TRANSFERS, GIT_CONFIG_KEY_2: 'lfs.transfer.maxretries', GIT_CONFIG_VALUE_2: process.env.INPUT_MAX_RETRIES};
const files = spawnSync('git', ['lfs', 'ls-files', '--name-only'], {cwd: process.env.INPUT_REPOSITORY_DIRECTORY, encoding: 'utf8', env: environment});
if (files.status !== 0) process.exit(files.status || 1);
if (!files.stdout.trim()) {
  console.log('No Git LFS files found. Skipping LFS upload.');
  process.exit(0);
}
const argumentsForPush = ['lfs', 'push'];
if (process.env.INPUT_ALL === 'true') argumentsForPush.push('--all');
argumentsForPush.push(process.env.INPUT_REMOTE_NAME, process.env.INPUT_BRANCH);
const result = spawnSync('git', argumentsForPush, {cwd: process.env.INPUT_REPOSITORY_DIRECTORY, stdio: 'inherit', env: environment, timeout: 1800000});

if (result.error) {
  throw result.error;
}
if (result.signal) {
  throw new Error(`git lfs push timed out or was terminated: ${result.signal}`);
}
if (result.status !== 0) {
  process.exit(result.status || 1);
}
