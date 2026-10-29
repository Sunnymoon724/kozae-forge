const test = require('node:test');
const assert = require('node:assert/strict');
const {findOrphans} = require('./index');

test('returns only mirrors whose source issue was deleted', () => {
  const mirrors = [
    {sourceIssueNumber: 1, destinationIssueNumber: 11, title: 'Kept'},
    {sourceIssueNumber: '2', destinationIssueNumber: 12, title: 'Removed'},
  ];
  assert.deepEqual(findOrphans([{number: '1'}], mirrors), [mirrors[1]]);
  assert.deepEqual(findOrphans([{number: 1}, {number: 2}], mirrors), []);
});
