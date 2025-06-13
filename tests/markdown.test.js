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

test('sanitizeUrl returns # on dangerous URLs', () => {
  expect(sanitizeUrl('javascript:alert(1)')).toBe('#');
});

test('parseMarkdown converts headers', () => {
  expect(parseMarkdown('# Title')).toBe('<h1>Title</h1>');
});
