// @ts-check

/**
 * @typedef {import('../types').RuleDef} RuleDef
 */

/**
 * ESLint rules extended from TypeScript ESLint but need type information.
 * For JavaScript files, unextended versions will be used.
 * @type {RuleDef[]}
 */
export const extendedRules = [
  'no-implied-eval',
  [
    'no-unused-vars',
    {
      args: 'all',
      argsIgnorePattern: '^_',
      caughtErrors: 'all',
      caughtErrorsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true,
    },
  ],
];

/**
 * Rules for JavaScript
 * @type {RuleDef[]}
 */
export const jsOnlyRules = [
  ['array-callback-return', { checkForEach: true, allowVoid: true }],
  'getter-return',
  'no-class-assign',
  'no-const-assign',
  'no-dupe-args',
  'no-dupe-class-members',
  'no-dupe-keys',
  'no-func-assign',
  'no-import-assign',
  'no-new-native-nonconstructor',
  'no-obj-calls',
  'no-setter-return',
  'no-this-before-super',
  'no-undef',
  'no-unreachable',
  'no-unsafe-negation',
  ['no-unsafe-optional-chaining', { disallowArithmeticOperators: true }],
  ['no-use-before-define', { functions: false, classes: false }],
  'use-isnan',
  'valid-typeof',
];

/**
 * Rules for TypeScript
 * @type {RuleDef[]}
 */
export const tsOnlyRules = [
  [
    'no-use-before-define',
    { functions: false, classes: false, variables: false },
  ],
  '@typescript-eslint/await-thenable',
];

/**
 * Common rules
 * @type {RuleDef[]}
 */
export const baseRules = [
  ...extendedRules.map(addPrefix),
  'constructor-super',
  'for-direction',
  'no-async-promise-executor',
  'no-await-in-loop',
  'no-compare-neg-zero',
  ['no-cond-assign', 'always'],
  'no-constant-binary-expression',
  'no-constant-condition',
  'no-constructor-return',
  'no-control-regex',
  'no-debugger',
  'no-dupe-else-if',
  'no-duplicate-case',
  'no-empty-character-class',
  'no-empty-pattern',
  'no-ex-assign',
  ['no-fallthrough', { reportUnusedFallthroughComment: true }],
  'no-irregular-whitespace',
  'no-loss-of-precision',
  'no-misleading-character-class',
  'no-promise-executor-return',
  'no-prototype-builtins',
  'no-self-assign',
  'no-self-compare',
  'no-sparse-arrays',
  'no-template-curly-in-string',
  'no-unexpected-multiline',
  'no-unreachable-loop',
  'no-unsafe-finally',
  'no-unused-private-class-members',
  'no-useless-assignment',
  'no-useless-backreference',
  'require-atomic-updates',
];

/**
 * @param {RuleDef} ruleDef
 * @returns {RuleDef}
 */
export function addPrefix(ruleDef) {
  return typeof ruleDef === 'string'
    ? `@typescript-eslint/${ruleDef}`
    : [`@typescript-eslint/${ruleDef[0]}`, ...ruleDef.slice(1)];
}
