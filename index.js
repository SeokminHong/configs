// @ts-check

import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';

import {
  addPrefix,
  baseRules,
  extendedTypedRules,
  jsOnlyRules,
  tsOnlyRules,
} from './rules/base.js';
import rules from './utils/rules.js';

/**
 * @typedef {{
 *   level?: import('./types').RuleLevel,
 *   parserOptions?: import('./types').ParserOptions,
 *   configs?: import('./types').Config[]
 * }} Options
 */

const tsExtensions = ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'];

const jsExtensions = ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'];

/**
 * @param {Options} options
 */
export default function config(options = {}) {
  const {
    level = 'error',
    parserOptions = { project: true },
    configs = [],
  } = options;

  return tseslint.config(
    {
      languageOptions: {
        parser: typescriptParser,
        parserOptions,
      },
      files: [...jsExtensions, ...tsExtensions],
      plugins: {
        '@typescript-eslint': typescriptPlugin,
      },
      rules: rules(baseRules, level),
    },
    /** TS */
    {
      files: tsExtensions,
      rules: rules(tsOnlyRules, level),
    },
    /** JS */
    {
      languageOptions: {
        parserOptions: {
          project: false,
          program: null,
        },
      },
      files: jsExtensions,
      rules: {
        ...rules(extendedTypedRules.map(addPrefix), 'off'),
        ...rules(extendedTypedRules, level),
        ...rules(jsOnlyRules, level),
      },
    },
    ...configs,
  );
}
