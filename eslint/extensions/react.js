// @ts-check
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

import {
  commonRuleDefs,
  jsOnlyRuleDefs,
  reactRefreshRuleDefs,
} from '../rules/react.js';
import { jsExtensions } from '../utils/extensions.js';
import rules from '../utils/rules.js';

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
      rules: rules(commonRuleDefs, rulesOptions),
    },
    {
      files: jsExtensions,
      rules: rules(jsOnlyRuleDefs, rulesOptions),
    },
    {
      rules: rules(reactRefreshRuleDefs(supportsConstantExport), rulesOptions),
    },
  ];
}
