// @ts-check
import reactPlugin from 'eslint-plugin-react';

import { commonRuleDefs, jsOnlyRuleDefs } from '../rules/react.js';
import { jsExtensions } from '../utils/extensions.js';
import rules from '../utils/rules.js';

/**
 * @type {import('../types').Extension}
 */
export default function react(rulesOptions) {
  return [
    {
      settings: {
        react: {
          version: 'detect',
        },
      },
      plugins: {
        react: reactPlugin,
      },
      rules: rules(commonRuleDefs, rulesOptions),
    },
    {
      files: jsExtensions,
      rules: rules(jsOnlyRuleDefs, rulesOptions),
    },
  ];
}
