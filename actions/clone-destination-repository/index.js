const {spawnSync} = require('node:child_process');
for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
const authorization = Buffer.from(`x-access-token:${process.env.INPUT_TOKEN}`).toString('base64');
const result = spawnSync('git', ['clone', `https://github.com/${process.env.INPUT_REPOSITORY}.git`, process.env.INPUT_DESTINATION_DIRECTORY], {stdio: 'inherit', env: {...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'Never', GIT_CONFIG_COUNT: '1', GIT_CONFIG_KEY_0: 'http.extraheader', GIT_CONFIG_VALUE_0: `AUTHORIZATION: Basic ${authorization}`}, timeout: 300000});
if (result.error) throw result.error;
if (result.signal) throw new Error(`git clone timed out or was terminated: ${result.signal}`);
if (result.status !== 0) process.exit(result.status || 1);
for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
