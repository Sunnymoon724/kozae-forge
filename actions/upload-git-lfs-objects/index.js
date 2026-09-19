const {spawnSync} = require('node:child_process');
for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
const result = spawnSync('git', ['-c', `http.extraheader=AUTHORIZATION: bearer ${process.env.INPUT_TOKEN}`, 'lfs', 'push', '--all', process.env.INPUT_REMOTE_NAME, process.env.INPUT_BRANCH], {cwd: process.env.INPUT_REPOSITORY_DIRECTORY, stdio: 'inherit'});
if (result.status !== 0) process.exit(result.status || 1);
for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
