// @ts-check
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

import {
  reactCommonRuleDefs,
  reactJsOnlyRuleDefs,
  reactRefreshRuleDefs,
} from '../rules/react.js';
import { jsExtensions } from '../utils/extensions.js';
import rules from '../utils/rules.js';
import jsx from './jsx.js';

/**
 * @typedef {{
 *   supportsConstantExport?: boolean
 * }} Options
 */
/**
 * @param {Options} options
 * @returns {import('../types').Extension}
 */
export default function react(options = {}) {
  const { supportsConstantExport = false } = options;

  return (rulesOptions) => [
    {
      settings: {
        react: {
          version: 'detect',
        },
      },
      plugins: {
        react: reactPlugin,
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
      rules: rules(reactRefreshRuleDefs(supportsConstantExport), rulesOptions),
    },
    ...jsx()(rulesOptions),
  ];
}
