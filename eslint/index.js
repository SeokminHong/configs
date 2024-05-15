// @ts-check

import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import unicornPlugin from 'eslint-plugin-unicorn';
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
      },
      files: [...jsExtensions, ...tsExtensions],
      plugins: {
        '@typescript-eslint': typescriptPlugin,
        unicorn: unicornPlugin,
      },
      rules: rules(baseRules, rulesOptions),
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
