for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) {
    process.env[name.replaceAll('-', '_')] = value;
  }
}

const fs = require('node:fs');
const path = require('node:path');

const mappingFile = process.env.INPUT_MAPPING_FILE;
const sourceFiles = process.env.INPUT_SOURCE_FILES.split(/\r?\n/).filter(Boolean);
if (!fs.existsSync(mappingFile)) throw new Error(`Mapping file not found: ${mappingFile}`);

const config = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));
if (!Array.isArray(config.mappings) || config.mappings.length === 0) throw new Error('The mapping file must contain a non-empty `mappings` array.');

function normalize(value, field, index) {
  if (typeof value !== 'string' || value.trim() === '') throw new Error(`Mapping ${index + 1} requires a non-empty \`${field}\` value.`);
  return value.replace(/\\/g, '/').replace(/^\.\//, '').replace(/\/+$/, '');
}

const defaultTemplate = config.defaultTemplate ? normalize(config.defaultTemplate, 'defaultTemplate', 0) : '';
const templateRules = Array.isArray(config.templateRules) ? config.templateRules.map((rule, index) => ({path: normalize(rule.path, 'templateRules.path', index), template: normalize(rule.template, 'templateRules.template', index)})) : [];
for (const rule of templateRules) if (!fs.existsSync(rule.template) || !fs.statSync(rule.template).isFile()) throw new Error(`Template file not found: ${rule.template}`);

const mappings = config.mappings.map((mapping, index) => {
  const source = normalize(mapping.source, 'source', index);
  const destination = normalize(mapping.destination, 'destination', index);
  const template = mapping.template ? normalize(mapping.template, 'template', index) : defaultTemplate;
  if (!template) throw new Error(`Mapping ${index + 1} requires a template or a top-level defaultTemplate.`);
  if (!fs.existsSync(template) || !fs.statSync(template).isFile()) throw new Error(`Template file not found: ${template}`);
  return {source, destination, template};
});

function matchesGlob(file, pattern) {
  const marker = pattern.replace(/\*\*/g, '\u0000').replace(/\*/g, '\u0001');
  const escaped = marker.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^${escaped.replace(/\u0000/g, '.*').replace(/\u0001/g, '[^/]*')}$`).test(file);
}

const include = [];
const seenSources = new Set();
for (const rawSource of sourceFiles) {
  const source = rawSource.replace(/\\/g, '/').replace(/^\.\//, '');
  if (!/\.md$/i.test(source) || !fs.existsSync(source) || !fs.statSync(source).isFile() || seenSources.has(source)) continue;
  const matches = mappings.filter((mapping) => source === mapping.source || source.startsWith(`${mapping.source}/`));
  if (matches.length > 1) throw new Error(`Source file matches multiple mappings: ${source}`);
  if (matches.length === 0) continue;
  const mapping = matches[0];
  const rule = templateRules.find((candidate) => matchesGlob(source, candidate.path));
  include.push({source, target: path.posix.join(mapping.destination, path.posix.relative(mapping.source, source)), template: rule ? rule.template : mapping.template});
  seenSources.add(source);
}

fs.appendFileSync(process.env.GITHUB_OUTPUT, `matrix=${JSON.stringify({include})}\nhas-sources=${include.length > 0}\n`);
