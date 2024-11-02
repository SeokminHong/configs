// @ts-check

import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import * as importPlugin from 'eslint-plugin-import-x';
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
 * @typedef Options
 * @type {Object}
 * @property {import('./types').RuleLevel} [level]
 * Level of severity. Default is `'error'`.
 * @property {import('./types').ParserOptions} [parserOptions]
 * `parserOptions` property for TypeScript ESLint plugin options. See {@link https://typescript-eslint.io/getting-started/typed-linting | TypeScript ESLint document}.
 * @property {string[]} [ignoredRules]
 * Rules to ignore. It's useful if you want to disable specific rules by environment because of performance.
 * @property {import('./types').RestrictSyntax[]} [restrictedSyntaxes]
 * Options for {@link https://eslint.org/docs/latest/rules/no-restricted-syntax | no-restricted-syntax} option.
 * This config uses the rule for reporting `export * from '...'` syntax.
 * When you want to add options, please add your options to this parameter.
 * If you want to override the rule, add another flat config after the `config()`.
 * ```
 * export default [
 *   ...config(),
 *   { rules: {'no-restrict-syntax': ... }}
 * ]
 * ```
 * @property {(keyof import('globals'))[]} [envs]
 * Environments for ESLint. For React project, please use `['browser', 'node']`.
 * @property {import('./types').Extension[]} [extensions]
 * Extensions for specific codebase. Currently, `jsx` and `react` are supported.
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
