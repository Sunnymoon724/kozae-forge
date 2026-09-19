const {spawnSync} = require('node:child_process');
const options = {cwd: process.env.INPUT_REPOSITORY_DIRECTORY, stdio: 'inherit'};
function git(args, optional = false) { const result = spawnSync('git', args, options); if (!optional && result.status !== 0) process.exit(result.status || 1); }
git(['lfs', 'install']); git(['remote', 'remove', process.env.INPUT_REMOTE_NAME], true); git(['remote', 'add', process.env.INPUT_REMOTE_NAME, `https://x-access-token:${process.env.INPUT_TOKEN}@github.com/${process.env.INPUT_REPOSITORY}.git`]); git(['config', `lfs.https://github.com/${process.env.INPUT_REPOSITORY}.git/info/lfs.access`, 'basic']);
