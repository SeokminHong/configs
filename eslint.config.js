import config from './eslint/index.js';

const defaultConfig = [
  ...config({
    envs: ['nodeBuiltin'],
  }),
  {
    ignores: ['node_modules', 'examples'],
  },
];

export default defaultConfig;
