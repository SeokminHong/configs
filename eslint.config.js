import config from './eslint/index.js';

export default [
  ...config(),
  {
    ignores: ['node_modules', 'examples'],
  },
];
