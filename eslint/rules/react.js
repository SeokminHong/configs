/**
 * Rules for JavaScript
 * @type {import('../types').RuleDef[]}
 */
export const commonRuleDefs = [
  'react/button-has-type',
  [
    'react/destructuring-assignment',
    'always',
    {
      destructureInSignature: 'always',
    },
  ],
  'react/display-name',
  [
    'react/function-component-definition',
    {
      namedComponents: 'function-declaration',
      unnamedComponents: 'arrow-function',
    },
  ],
  [
    'react/hook-use-state',
    {
      allowDestructuredState: true,
    },
  ],
  'react/iframe-missing-sandbox',
  ['react/jsx-boolean-value', 'never'],
  'react/jsx-child-element-spacing',
  'react/jsx-curly-brace-presence',
  [
    'react/jsx-filename-extension',
    {
      extensions: ['.jsx', '.tsx'],
    },
  ],
  'react/jsx-fragments',
  'react/jsx-handler-names',
  [
    'react/jsx-key',
    {
      checkFragmentShorthand: true,
      checkKeyMustBeforeSpread: true,
    },
  ],
  'react/jsx-no-constructed-context-values',
  'react/jsx-no-leaked-render',
  'react/jsx-no-script-url',
  'react/jsx-no-target-blank',
  ['react/jsx-no-useless-fragment', { allowExpressions: true }],
  'react/jsx-pascal-case',
  'react/no-children-prop',
  'react/no-danger-with-children',
  'react/no-object-type-as-default-prop',
  'react/no-render-return-value',
  'react/no-string-refs',
  'react/no-unescaped-entities',
  'react/no-unstable-nested-components',
  'react/void-dom-elements-no-children',
];

/**
 * @type {import('../types').RuleDef[]}
 */
export const jsOnlyRuleDefs = [
  'react/jsx-no-duplicate-props',
  'react/no-unknown-property',
];
