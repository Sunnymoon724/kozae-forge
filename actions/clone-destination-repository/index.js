const {spawnSync} = require('node:child_process');
for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
const result = spawnSync('git', ['-c', `http.extraheader=AUTHORIZATION: bearer ${process.env.INPUT_TOKEN}`, 'clone', `https://github.com/${process.env.INPUT_REPOSITORY}.git`, process.env.INPUT_DESTINATION_DIRECTORY], {stdio: 'inherit'});
if (result.status !== 0) process.exit(result.status || 1);
for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
