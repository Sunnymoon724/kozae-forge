const {spawnSync} = require('node:child_process');
const result = spawnSync('git', ['lfs', 'push', '--all', process.env.INPUT_REMOTE_NAME, process.env.INPUT_BRANCH], {cwd: process.env.INPUT_REPOSITORY_DIRECTORY, stdio: 'inherit'});
if (result.status !== 0) process.exit(result.status || 1);
