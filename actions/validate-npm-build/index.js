const {spawnSync} = require('node:child_process');

const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const options = {cwd: process.env.INPUT_WORKING_DIRECTORY, stdio: 'inherit', shell: process.platform === 'win32'};
for (const args of [['ci'], ['run', 'build']]) {
  const result = spawnSync(command, args, options);
  if (result.status !== 0) process.exit(result.status || 1);
}
