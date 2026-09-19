const {spawnSync} = require('node:child_process');
const result = spawnSync('git', ['push', 'origin', `HEAD:${process.env.INPUT_BRANCH}`], {cwd: process.env.INPUT_DESTINATION_DIRECTORY, stdio: 'inherit'});
if (result.status !== 0) process.exit(result.status || 1);
