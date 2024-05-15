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
 *   fullMode?: boolean,
 *   fullModeOnlyRules?: string[],
 *   restrictedSyntaxes?: import('./types').RestrictSyntax[]
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
    fullMode = false,
    fullModeOnlyRules = [],
    restrictedSyntaxes = [],
  } = options;

  const rulesOptions = {
    level,
    fullMode,
    fullModeOnlyRules: new Set(fullModeOnlyRules),
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
  );
}
