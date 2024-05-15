// @ts-check
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

import rules from '../utils/rules.js';
import { jsxRuleDefs } from '../rules/jsx.js';

/**
 * @returns {import('../types').Extension}
 */
export default function jsx() {
  return (rulesOptions) => [
    {
      plugins: {
        'jsx-a11y': jsxA11yPlugin,
      },
      rules: rules(jsxRuleDefs, rulesOptions),
    },
  ];
}
