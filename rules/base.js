// @ts-check

/**
 * @typedef {import('../types').RuleDef} RuleDef
 */

/**
 * ESLint rules extended from TypeScript ESLint but need type information.
 * For JavaScript files, unextended versions will be used.
 * @type {RuleDef[]}
 */
export const extendedTypedRules = [
  'dot-notation',
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
  'no-useless-constructor',
  'prefer-destructuring',
  'prefer-promise-reject-errors',
  'require-await',
];

/** @type {RuleDef[]} */
const extendedRules = [
  'class-methods-use-this',
  'default-param-last',
  'no-array-constructor',
  [
    'no-empty-function',
    { allow: ['arrowFunctions', 'constructors', 'decoratedFunctions'] },
  ],
  'no-loop-func',
  'no-loss-of-precision',
  [
    'no-shadow',
    {
      ignoreOnInitialization: true,
      ignoreFunctionTypeParameterNameValueShadow: true,
    },
  ],
  'no-unused-expressions',
];

/**
 * Rules for JavaScript
 * @type {RuleDef[]}
 */
export const jsOnlyRules = [
  ['array-callback-return', { checkForEach: true, allowVoid: true }],
  'constructor-super',
  'getter-return',
  'no-class-assign',
  'no-const-assign',
  'no-dupe-args',
  'no-dupe-class-members',
  'no-dupe-keys',
  'no-extend-native',
  'no-func-assign',
  'no-global-assign',
  'no-import-assign',
  'no-invalid-this',
  'no-iterator',
  'no-new-native-nonconstructor',
  'no-obj-calls',
  'no-proto',
  'no-redeclare',
  'no-setter-return',
  'no-this-before-super',
  'no-throw-literal',
  'no-undef',
  'no-unreachable',
  'no-unsafe-negation',
  ['no-unsafe-optional-chaining', { disallowArithmeticOperators: true }],
  ['no-use-before-define', { functions: false, classes: false }],
  'use-isnan',
  'valid-typeof',
  ['consistent-return', { treatUndefinedAsUnspecified: true }],
];

/**
 * Rules for TypeScript
 * @type {RuleDef[]}
 */
export const tsOnlyRules = [
  [
    '@typescript-eslint/no-use-before-define',
    { functions: false, classes: false, variables: false },
  ],
  '@typescript-eslint/await-thenable',
  '@typescript-eslint/only-throw-error',
  '@typescript-eslint/return-await',
];

/**
 * Common rules
 * @type {RuleDef[]}
 */
export const baseRules = [
  ...extendedTypedRules.map(addPrefix),
  ...extendedRules.map(addPrefix),
  'accessor-pairs',
  'arrow-body-style',
  'curly',
  'default-case',
  'default-case-last',
  'eqeqeq',
  'for-direction',
  'func-name-matching',
  'func-names',
  ['func-style', 'declaration', { allowArrowFunctions: true }],
  ['grouped-accessor-pairs', 'getBeforeSet'],
  'guard-for-in',
  ['logical-assignment-operators', 'always', { enforceForIfStatements: true }],
  'no-alert',
  'no-async-promise-executor',
  'no-await-in-loop',
  'no-bitwise',
  'no-caller',
  'no-case-declarations',
  'no-compare-neg-zero',
  ['no-cond-assign', 'always'],
  'no-console',
  'no-constant-binary-expression',
  'no-constant-condition',
  'no-constructor-return',
  'no-control-regex',
  'no-debugger',
  'no-delete-var',
  'no-div-regex',
  'no-dupe-else-if',
  'no-duplicate-case',
  ['no-else-return', { allowElseIf: false }],
  'no-empty',
  'no-empty-character-class',
  'no-empty-pattern',
  'no-empty-static-block',
  'no-eval',
  'no-ex-assign',
  'no-extra-bind',
  ['no-extra-boolean-cast', { enforceForLogicalOperands: true }],
  ['no-fallthrough', { reportUnusedFallthroughComment: true }],
  ['no-implicit-coercion', { disallowTemplateShorthand: true }],
  'no-irregular-whitespace',
  'no-labels',
  'no-lone-blocks',
  'no-lonely-if',
  'no-misleading-character-class',
  'no-multi-str',
  'no-negated-condition',
  'no-nested-ternary',
  'no-new',
  'no-new-func',
  'no-new-wrappers',
  'no-nonoctal-decimal-escape',
  'no-object-constructor',
  'no-octal',
  'no-octal-escape',
  'no-param-reassign',
  ['no-plusplus', { allowForLoopAfterthoughts: true }],
  ['no-promise-executor-return', { allowVoid: true }],
  'no-prototype-builtins',
  'no-regex-spaces',
  'no-return-assign',
  'no-script-url',
  'no-self-assign',
  'no-self-compare',
  'no-sequences',
  'no-shadow-restricted-names',
  'no-sparse-arrays',
  'no-template-curly-in-string',
  'no-underscore-dangle',
  'no-unexpected-multiline',
  ['no-unneeded-ternary', { defaultAssignment: false }],
  'no-unreachable-loop',
  'no-unsafe-finally',
  'no-unused-private-class-members',
  'no-useless-assignment',
  'no-useless-backreference',
  'no-useless-call',
  'no-useless-catch',
  'no-useless-computed-key',
  'no-useless-concat',
  'no-useless-escape',
  'no-useless-rename',
  'no-useless-return',
  'no-var',
  'no-with',
  'object-shorthand',
  ['one-var', 'never'],
  'operator-assignment',
  'prefer-arrow-callback',
  'prefer-const',
  'prefer-exponentiation-operator',
  'prefer-named-capture-group',
  'prefer-numeric-literals',
  'prefer-object-has-own',
  'prefer-object-spread',
  'prefer-regex-literals',
  'prefer-rest-params',
  'prefer-spread',
  'prefer-template',
  'radix',
  'require-atomic-updates',
  'require-unicode-regexp',
  'require-yield',
  'symbol-description',
  ['yoda', 'never', { exceptRange: true }],
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
