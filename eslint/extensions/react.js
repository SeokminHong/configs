// @ts-check
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

import { jsExtensions } from '../utils/extensions.js';
import rules from '../utils/rules.js';

import jsx from './jsx.js';

/**
 * Rules for JavaScript
 * @type {import('../types').RuleDef[]}
 */
const reactCommonRuleDefs = [
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
  'react/jsx-no-comment-textnodes',
  'react/jsx-uses-vars',
  'react/iframe-missing-sandbox',
  ['react/jsx-boolean-value', 'never'],
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
  'react/no-deprecated',
  'react/no-direct-mutation-state',
  'react/no-find-dom-node',
  'react/no-object-type-as-default-prop',
  'react/no-render-return-value',
  'react/no-string-refs',
  'react/no-unsafe',
  'react/no-unescaped-entities',
  'react/no-unstable-nested-components',
  'react/void-dom-elements-no-children',

  'react-hooks/error-boundaries',
  'react-hooks/immutability',
  'react-hooks/preserve-manual-memoization',
  'react-hooks/purity',
  'react-hooks/refs',
  'react-hooks/rules-of-hooks',
  'react-hooks/exhaustive-deps',
  'react-hooks/set-state-in-effect',
  'react-hooks/set-state-in-render',
  'react-hooks/static-components',
  'react-hooks/unsupported-syntax',
  'react-hooks/use-memo',
  'react-hooks/void-use-memo',
];

/**
 * @type {import('../types').RuleDef[]}
 */
const reactJsOnlyRuleDefs = [
  'react/jsx-no-duplicate-props',
  'react/jsx-no-undef',
  'react/no-unknown-property',
];

/**
 * @typedef Options
 * @type {Object}
 *
 * @property {boolean} [allowConstantExport]
 * @property {boolean} [reactRouter]
 * @property {boolean} [supportsConstantExport]
 * Deprecated: Use `allowConstantExport` instead.
 */

/**
 * @param {Options} options
 * @returns {import('../types').Extension}
 */
export default function react(options = {}) {
  const {
    supportsConstantExport = false,
    allowConstantExport = supportsConstantExport,
    reactRouter = false,
  } = options;

  return (rulesOptions) => [
    {
      settings: {
        react: {
          version: 'detect',
        },
      },
      plugins: {
        react: reactPlugin,
        // @ts-ignore
        'react-hooks': reactHooksPlugin,
        'react-refresh': reactRefreshPlugin,
      },
      rules: rules(reactCommonRuleDefs, rulesOptions),
    },
    {
      files: jsExtensions,
      rules: rules(reactJsOnlyRuleDefs, rulesOptions),
    },
    {
      rules: rules(
        [
          [
            'react-refresh/only-export-components',
            reactRouter
              ? {
                  allowExportNames: [
                    'meta',
                    'links',
                    'headers',
                    'loader',
                    'action',
                    'handle',
                  ],
                  allowConstantExport: true,
                }
              : { allowConstantExport },
          ],
        ],
        rulesOptions,
      ),
    },
    ...jsx()(rulesOptions),
  ];
}
