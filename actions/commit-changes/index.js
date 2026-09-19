const {spawnSync} = require('node:child_process');
const options = {cwd: process.env.INPUT_DESTINATION_DIRECTORY, stdio: 'inherit'};
function git(args) { const result = spawnSync('git', args, options); if (result.status !== 0) process.exit(result.status || 1); }
git(['add', '-A']);
const changed = spawnSync('git', ['diff', '--cached', '--quiet'], options);
if (changed.status === 0) console.log('No changes to commit'); else if (changed.status === 1) { git(['config', 'user.name', 'forge-bot']); git(['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']); git(['commit', '-m', process.env.INPUT_MESSAGE]); } else process.exit(changed.status || 1);
