// @ts-check

import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import * as importPlugin from 'eslint-plugin-import';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import {
  addTypeScriptPrefix,
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
 *   ignoredRules?: string[],
 *   restrictedSyntaxes?: import('./types').RestrictSyntax[]
 *   envs?: (keyof import('globals'))[]
 *   extensions?: import('./types').Extension[]
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
    ignoredRules = [],
    restrictedSyntaxes = [],
    envs = [],
    extensions = [],
  } = options;

  const rulesOptions = {
    level,
    ignoredRules: new Set(ignoredRules),
  };

  return tseslint.config(
    {
      languageOptions: {
        parser: typescriptParser,
        parserOptions,
        globals: Object.assign({}, ...envs.map((env) => globals[env])),
      },
      files: [...jsExtensions, ...tsExtensions],
      plugins: {
        '@typescript-eslint': typescriptPlugin,
        unicorn: unicornPlugin,
        import: importPlugin,
      },
      rules: rules(baseRules, rulesOptions),
      settings: {
        'import/extensions': jsExtensions,
        '@typescript-eslint/parser': tsExtensions,
      },
    },
    {
      rules: {
        'no-restricted-syntax': [
          level,
          {
            selector: 'ExportAllDeclaration',
            message: 'Export only modules you need.',
          },
          ...restrictedSyntaxes,
        ],
      },
    },
    /** TS */
    {
      files: tsExtensions,
      rules: rules(tsOnlyRules, rulesOptions),
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
        ...rules(
          extendedTypedRules.map((ruleDef) => addTypeScriptPrefix(ruleDef)),
          {
            ...rulesOptions,
            level: 'off',
          },
        ),
        ...rules(extendedTypedRules, rulesOptions),
        ...rules(jsOnlyRules, rulesOptions),
      },
    },
    ...extensions.flatMap((extension) => extension(rulesOptions)),
  );
}
