for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;

const {readFileSync, appendFileSync} = require('node:fs');
const {GITHUB_OUTPUT, GITHUB_REF_NAME, INPUT_BRANCH: inputBranch, INPUT_CONFIG_PATH: configPath} = process.env;
const branch = inputBranch || GITHUB_REF_NAME;
if (!branch) throw new Error('branch input or GITHUB_REF_NAME must be set.');

let config;
try {
  config = JSON.parse(readFileSync(configPath, 'utf8'));
} catch (error) {
  throw new Error(`Unable to read ${configPath}: ${error.message}`);
}
if (!Array.isArray(config.branches) || config.branches.some((value) => typeof value !== 'string')) {
  throw new Error(`${configPath} must contain a string array named branches.`);
}

const enabled = config.branches.includes(branch);
appendFileSync(GITHUB_OUTPUT, `branch=${branch}\nenabled=${enabled}\n`);
console.log(enabled ? `Review is enabled for ${branch}.` : `Review is disabled for ${branch}.`);
