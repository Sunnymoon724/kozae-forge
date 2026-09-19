const fs = require('node:fs');
const path = require('node:path');

for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;

const source = path.resolve(process.env.INPUT_SOURCE_FOLDER);
const destination = path.resolve(process.env.INPUT_DESTINATION_FOLDER);
const patterns = ['.git', 'destination-repo', '.github/workflows/mirror-repository.yml'];
if (!fs.statSync(source).isDirectory()) throw new Error(`Source folder is not a directory: ${source}`);
if (process.env.INPUT_EXCLUDE_FILE) patterns.push(...fs.readFileSync(process.env.INPUT_EXCLUDE_FILE, 'utf8').split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !line.startsWith('#')));

function normalize(value) { return value.replaceAll('\\', '/').replace(/^\.\//, '').replace(/\/$/, ''); }
function excluded(relativePath) {
  const value = normalize(relativePath);
  return patterns.some((item) => {
    const pattern = normalize(item).replace(/[.+^${}()|[\]\\]/g, '\\$&').replaceAll('**', '.*').replaceAll('*', '[^/]*');
    return new RegExp(`^${pattern}(?:/.*)?$`).test(value);
  });
}
function relative(root, target) { return path.relative(root, target).replaceAll(path.sep, '/'); }
function copy(current) {
  for (const entry of fs.readdirSync(current, {withFileTypes: true})) {
    const sourcePath = path.join(current, entry.name);
    const itemRelative = relative(source, sourcePath);
    if (excluded(itemRelative)) continue;
    const target = path.join(destination, itemRelative);
    if (entry.isDirectory()) {
      fs.mkdirSync(target, {recursive: true});
      copy(sourcePath);
    } else if (entry.isSymbolicLink()) {
      fs.mkdirSync(path.dirname(target), {recursive: true});
      fs.rmSync(target, {force: true});
      fs.symlinkSync(fs.readlinkSync(sourcePath), target);
    } else if (entry.isFile()) {
      fs.mkdirSync(path.dirname(target), {recursive: true});
      fs.copyFileSync(sourcePath, target);
    }
  }
}
function removeExtra(current) {
  for (const entry of fs.readdirSync(current, {withFileTypes: true})) {
    const target = path.join(current, entry.name);
    const itemRelative = relative(destination, target);
    if (excluded(itemRelative)) continue;
    if (!fs.existsSync(path.join(source, itemRelative))) fs.rmSync(target, {recursive: true, force: true});
    else if (entry.isDirectory()) removeExtra(target);
  }
}

fs.mkdirSync(destination, {recursive: true});
copy(source);
if (process.env.INPUT_DELETE_EXTRA === 'true') removeExtra(destination);
