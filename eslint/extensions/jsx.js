// @ts-check
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

import rules from '../utils/rules.js';

/** @type {import("../types").RuleDef[]} */
const jsxRuleDefs = [
  'jsx-a11y/alt-text',
  'jsx-a11y/anchor-ambiguous-text',
  'jsx-a11y/anchor-has-content',
  'jsx-a11y/anchor-is-valid',
  'jsx-a11y/aria-activedescendant-has-tabindex',
  'jsx-a11y/aria-props',
  'jsx-a11y/aria-proptypes',
  'jsx-a11y/aria-role',
  'jsx-a11y/aria-unsupported-elements',
  'jsx-a11y/autocomplete-valid',
  'jsx-a11y/click-events-have-key-events',
  'jsx-a11y/heading-has-content',
  'jsx-a11y/html-has-lang',
  'jsx-a11y/img-redundant-alt',
  'jsx-a11y/interactive-supports-focus',
  'jsx-a11y/mouse-events-have-key-events',
  'jsx-a11y/no-access-key',
  'jsx-a11y/no-aria-hidden-on-focusable',
  'jsx-a11y/no-autofocus',
  'jsx-a11y/no-interactive-element-to-noninteractive-role',
  'jsx-a11y/no-noninteractive-tabindex',
  'jsx-a11y/no-redundant-roles',
  'jsx-a11y/no-static-element-interactions',
  'jsx-a11y/role-has-required-aria-props',
  'jsx-a11y/role-supports-aria-props',
  'jsx-a11y/scope',
  'jsx-a11y/tabindex-no-positive',
];

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
