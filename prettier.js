// @ts-check

/**
 * @type {import('prettier').Config}
 */
const config = {
  arrowParens: 'always',
  endOfLine: 'lf',
  jsxSingleQuote: false,
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  plugins: ['./prettier-plugins/sort-imports.js'],
  importOrder: [
    '<TYPES>^(node:)',
    '<TYPES>^(?![./]|~/|/)',
    '',
    '<TYPES>^~/',
    '',
    String.raw`<TYPES>^\.\.`,
    '',
    '<TYPES>^[.]',
    '',
    // Public asset types
    '<TYPES>^/',
    '',
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '',
    '^~/',
    '',
    String.raw`^\.\.`,
    '',
    '^[.]',
    '',
    // Public assets
    '^/',
  ],
  importOrderTypeScriptVersion: '5.9.3',
};

export default config;
