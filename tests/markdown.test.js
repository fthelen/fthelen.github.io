const assert = require('assert');

// Minimal DOM stubs for markdown.js
global.document = {
  addEventListener: () => {},
  getElementById: () => null,
};

global.window = {
  addEventListener: () => {},
  location: { pathname: '' },
  scrollTo: () => {},
};

global.localStorage = {
  getItem: () => null,
  setItem: () => {},
};

const { parseMarkdown, sanitizeUrl } = require('../markdown.js');

assert.strictEqual(sanitizeUrl('javascript:alert(1)'), '#');
assert.strictEqual(parseMarkdown('# Title'), '<h1>Title</h1>');

console.log('All tests passed');
