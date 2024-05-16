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
  [
    'prefer-destructuring',
    {
      array: false,
    },
  ],
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
  ['consistent-return', { treatUndefinedAsUnspecified: true }],
  'constructor-super',
  'getter-return',
  'no-async-promise-executor',
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
  'import/default',
  'import/export',
  ['import/extensions', 'ignorePackages'],
  'unicorn/no-static-only-class',
  'unicorn/no-unnecessary-await',
  'unicorn/prefer-top-level-await',
];

/**
 * Rules for TypeScript
 * @type {RuleDef[]}
 */
export const tsOnlyRules = [
  '@typescript-eslint/adjacent-overload-signatures',
  ['@typescript-eslint/array-type', { default: 'array-simple' }],
  '@typescript-eslint/await-thenable',
  '@typescript-eslint/ban-ts-comment',
  '@typescript-eslint/class-literal-property-style',
  '@typescript-eslint/consistent-generic-constructors',
  '@typescript-eslint/consistent-indexed-object-style',
  '@typescript-eslint/consistent-type-assertions',
  '@typescript-eslint/consistent-type-definitions',
  [
    '@typescript-eslint/explicit-member-accessibility',
    {
      accessibility: 'no-public',
    },
  ],
  '@typescript-eslint/method-signature-style',
  '@typescript-eslint/no-array-delete',
  '@typescript-eslint/no-base-to-string',
  '@typescript-eslint/no-confusing-void-expression',
  '@typescript-eslint/no-duplicate-enum-values',
  '@typescript-eslint/no-duplicate-type-constituents',
  '@typescript-eslint/no-dynamic-delete',
  '@typescript-eslint/no-empty-interface',
  '@typescript-eslint/no-explicit-any',
  '@typescript-eslint/no-extraneous-class',
  '@typescript-eslint/no-floating-promises',
  '@typescript-eslint/no-for-in-array',
  '@typescript-eslint/no-inferrable-types',
  '@typescript-eslint/no-invalid-void-type',
  '@typescript-eslint/no-meaningless-void-operator',
  '@typescript-eslint/no-misused-new',
  '@typescript-eslint/no-misused-promises',
  '@typescript-eslint/no-mixed-enums',
  '@typescript-eslint/no-namespace',
  '@typescript-eslint/no-non-null-assertion',
  '@typescript-eslint/no-redundant-type-constituents',
  '@typescript-eslint/no-require-imports',
  '@typescript-eslint/no-this-alias',
  '@typescript-eslint/no-unnecessary-boolean-literal-compare',
  [
    '@typescript-eslint/no-unnecessary-condition',
    {
      allowConstantLoopConditions: true,
    },
  ],
  '@typescript-eslint/no-unnecessary-qualifier',
  '@typescript-eslint/no-unnecessary-type-arguments',
  '@typescript-eslint/no-unnecessary-type-assertion',
  '@typescript-eslint/no-unnecessary-type-constraint',
  '@typescript-eslint/no-unsafe-argument',
  '@typescript-eslint/no-unsafe-assignment',
  '@typescript-eslint/no-unsafe-call',
  '@typescript-eslint/no-unsafe-declaration-merging',
  '@typescript-eslint/no-unsafe-enum-comparison',
  '@typescript-eslint/no-unsafe-member-access',
  '@typescript-eslint/no-unsafe-return',
  '@typescript-eslint/no-useless-empty-export',
  '@typescript-eslint/no-useless-template-literals',
  [
    '@typescript-eslint/no-use-before-define',
    { functions: false, classes: false, variables: false },
  ],
  '@typescript-eslint/only-throw-error',
  [
    '@typescript-eslint/parameter-properties',
    {
      prefer: 'parameter-property',
    },
  ],
  '@typescript-eslint/prefer-as-const',
  '@typescript-eslint/prefer-enum-initializers',
  '@typescript-eslint/prefer-find',
  '@typescript-eslint/prefer-for-of',
  '@typescript-eslint/prefer-function-type',
  '@typescript-eslint/prefer-includes',
  '@typescript-eslint/prefer-literal-enum-member',
  '@typescript-eslint/prefer-nullish-coalescing',
  '@typescript-eslint/prefer-optional-chain',
  '@typescript-eslint/prefer-readonly',
  '@typescript-eslint/prefer-reduce-type-parameter',
  '@typescript-eslint/prefer-regexp-exec',
  '@typescript-eslint/prefer-return-this-type',
  '@typescript-eslint/prefer-string-starts-ends-with',
  '@typescript-eslint/promise-function-async',
  '@typescript-eslint/require-array-sort-compare',
  '@typescript-eslint/restrict-plus-operands',
  '@typescript-eslint/restrict-template-expressions',
  '@typescript-eslint/return-await',
  [
    '@typescript-eslint/strict-boolean-expressions',
    {
      allowString: false,
      allowNumber: false,
    },
  ],
  '@typescript-eslint/switch-exhaustiveness-check',
  '@typescript-eslint/triple-slash-reference',
  '@typescript-eslint/unbound-method',
  '@typescript-eslint/unified-signatures',
  '@typescript-eslint/use-unknown-in-catch-callback-variable',
  ['import/consistent-type-specifier-style', 'prefer-top-level'],
];

/**
 * Common rules
 * @type {RuleDef[]}
 */
export const baseRules = [
  ...extendedTypedRules.map((ruleDef) => addTypeScriptPrefix(ruleDef)),
  ...extendedRules.map((ruleDef) => addTypeScriptPrefix(ruleDef)),
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
  ['no-fallthrough', { allowEmptyCase: false }],
  ['no-implicit-coercion', { disallowTemplateShorthand: true }],
  'no-irregular-whitespace',
  'no-labels',
  'no-lone-blocks',
  'no-lonely-if',
  'no-misleading-character-class',
  'no-multi-str',
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
  'no-promise-executor-return',
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
  'no-unreachable-loop',
  'no-unsafe-finally',
  'no-unused-private-class-members',
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
  'import/no-deprecated',
  ['import/no-duplicates', { considerQueryString: true }],
  'import/no-empty-named-blocks',
  'import/first',
  'import/newline-after-import',
  'import/no-anonymous-default-export',
  'import/no-mutable-exports',
  'import/no-named-as-default',
  'import/no-named-as-default-member',
  'import/no-relative-packages',
  'import/no-self-import',
  'import/no-useless-path-segments',
  [
    'import/order',
    {
      alphabetize: {
        order: 'asc',
        orderImportKind: 'asc',
        caseInsensitive: true,
      },
      'newlines-between': 'always',
    },
  ],
  'import/prefer-default-export',
  'unicorn/better-regex',
  'unicorn/catch-error-name',
  'unicorn/consistent-destructuring',
  'unicorn/consistent-empty-array-spread',
  'unicorn/consistent-function-scoping',
  'unicorn/custom-error-definition',
  'unicorn/error-message',
  'unicorn/escape-case',
  'unicorn/new-for-builtins',
  'unicorn/no-abusive-eslint-disable',
  'unicorn/no-anonymous-default-export',
  'unicorn/no-array-for-each',
  'unicorn/no-await-expression-member',
  'unicorn/no-for-loop',
  'unicorn/no-hex-escape',
  'unicorn/no-instanceof-array',
  'unicorn/no-invalid-fetch-options',
  'unicorn/no-invalid-remove-event-listener',
  'unicorn/no-lonely-if',
  'unicorn/no-magic-array-flat-depth',
  'unicorn/no-negated-condition',
  'unicorn/no-new-array',
  'unicorn/no-object-as-default-parameter',
  'unicorn/no-single-promise-in-promise-methods',
  'unicorn/no-thenable',
  'unicorn/no-this-assignment',
  'unicorn/no-typeof-undefined',
  'unicorn/no-unnecessary-polyfills',
  'unicorn/no-unreadable-array-destructuring',
  'unicorn/no-unreadable-iife',
  'unicorn/no-useless-fallback-in-spread',
  'unicorn/no-useless-promise-resolve-reject',
  'unicorn/no-useless-spread',
  'unicorn/no-useless-switch-case',
  [
    'unicorn/no-useless-undefined',
    {
      checkArguments: false,
    },
  ],
  'unicorn/no-zero-fractions',
  'unicorn/number-literal-case',
  [
    'unicorn/numeric-separators-style',
    {
      hexadecimal: {
        minimumDigits: 7,
        groupLength: 4,
      },
    },
  ],
  'unicorn/prefer-date-now',
  'unicorn/prefer-default-parameters',
  'unicorn/prefer-export-from',
  'unicorn/prefer-logical-operator-over-ternary',
  'unicorn/prefer-math-trunc',
  'unicorn/prefer-modern-math-apis',
  'unicorn/prefer-number-properties',
  'unicorn/prefer-object-from-entries',
  'unicorn/prefer-query-selector',
  'unicorn/prefer-reflect-apply',
  'unicorn/prefer-regexp-test',
  'unicorn/prefer-string-raw',
  'unicorn/prefer-string-trim-start-end',
  'unicorn/prefer-type-error',
  ['unicorn/relative-url-style', 'always'],
  'unicorn/switch-case-braces',
];

/**
 * @param {RuleDef} ruleDef
 * @returns {RuleDef}
 */
export function addTypeScriptPrefix(ruleDef) {
  return typeof ruleDef === 'string'
    ? `@typescript-eslint/${ruleDef}`
    : [`@typescript-eslint/${ruleDef[0]}`, ...ruleDef.slice(1)];
}
