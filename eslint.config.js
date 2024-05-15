import config from './eslint/index.js';

const defaultConfig = [
  ...config(),
  {
    ignores: ['node_modules', 'examples'],
  },
];

export default defaultConfig;
