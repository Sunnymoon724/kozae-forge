const {spawnSync} = require('node:child_process');
for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
const authorization = Buffer.from(`x-access-token:${process.env.INPUT_TOKEN}`).toString('base64');
const result = spawnSync('git', ['-c', `http.extraheader=AUTHORIZATION: basic ${authorization}`, 'push', 'origin', `HEAD:${process.env.INPUT_BRANCH}`], {cwd: process.env.INPUT_DESTINATION_DIRECTORY, stdio: 'inherit', env: {...process.env, GIT_TERMINAL_PROMPT: '0'}, timeout: 300000});
if (result.error) throw result.error;
if (result.signal) throw new Error(`git push timed out or was terminated: ${result.signal}`);
if (result.status !== 0) process.exit(result.status || 1);
for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
