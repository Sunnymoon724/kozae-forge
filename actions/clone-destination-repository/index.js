const {spawnSync} = require('node:child_process');
const result = spawnSync('git', ['clone', `https://x-access-token:${process.env.INPUT_TOKEN}@github.com/${process.env.INPUT_REPOSITORY}.git`, process.env.INPUT_DESTINATION_DIRECTORY], {stdio: 'inherit'});
if (result.status !== 0) process.exit(result.status || 1);
