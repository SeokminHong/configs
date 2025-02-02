// @ts-check
import * as storybookPlugin from 'eslint-plugin-storybook';

import rules from '../utils/rules.js';

const storybookFiles = [
  '**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)',
  '**/*.story.@(ts|tsx|js|jsx|mjs|cjs)',
];

/**
 * @typedef {{
 *   react?: boolean;
 * }} Options
 */
/**
 * @param {Options} options
 * @returns {import('../types').Extension}
 */
export default function storybookReact(options = {}) {
  const { react = true } = options;

  return (rulesOptions) => {
    /** @type {ReturnType<import('../types').Extension>} */
    const config = [
      {
        files: storybookFiles,
        plugins: {
          storybook: storybookPlugin,
        },
        rules: rules(
          [
            'storybook/await-interactions',
            'storybook/context-in-play-function',
            'storybook/default-exports',
            'storybook/hierarchy-separator',
            'storybook/no-redundant-story-name',
            'storybook/prefer-pascal-case',
            'storybook/story-exports',
            'storybook/use-storybook-expect',
            'storybook/use-storybook-testing-library',
          ],
          rulesOptions,
        ),
      },
      {
        files: ['.storybook/main.@(js|cjs|mjs|ts)'],
        rules: rules(['storybook/no-uninstalled-addons'], rulesOptions),
      },
    ];

    if (react) {
      config.push({
        files: ['.storybook/**/*', ...storybookFiles],
        rules: {
          'react/function-component-definition': 'off',
          'react-refresh/only-export-components': 'off',
        },
      });
    }

    return config;
  };
}
