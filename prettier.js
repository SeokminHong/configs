// @ts-check

/**
 * @type {import('prettier').Config}
 */
export default {
  arrowParens: 'always',
  endOfLine: 'lf',
  jsxSingleQuote: false,
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '',
    '^\\.\\.',
    '',
    '^[.]',
    '',
    // Public assets
    '^/',
  ],
};
