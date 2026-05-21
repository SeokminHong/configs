// @ts-check
import { importX } from 'eslint-plugin-import-x';
import unicornPlugin from 'eslint-plugin-unicorn';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import {
  addTypeScriptPrefix,
  baseRules,
  expensiveRules,
  extendedRules,
  extendedTypedRules,
  jsExtendedRules,
  jsExtendedTypedRules,
  jsOnlyRules,
  tsOnlyRules,
} from './rules/base.js';
import rules from './utils/rules.js';

export { expensiveRules } from './rules/base.js';

/**
 * @typedef Options
 * @type {Object}
 * @property {import('./types').RuleLevel} [level]
 * Level of severity. Default is `'error'`.
 * @property {import('./types').ParserOptions} [parserOptions]
 * `parserOptions` property for TypeScript ESLint plugin options. See {@link https://typescript-eslint.io/getting-started/typed-linting | TypeScript ESLint document}.
 * @property {import('./types').Preset[]} [presets]
 * Presets for common project shapes. Presets can provide environments, extensions, ignored rules, and performance policy.
 * @property {import('./types').PerformanceProfile} [performance]
 * Rule performance profile. Default is `'ci'`, which keeps all rules enabled. Use `'local'` to disable classified expensive rules.
 * @property {string[]} [ignoredRules]
 * Rules to ignore. These are merged with preset ignored rules and profile-specific ignored rules.
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
 * Extensions for specific codebase. Currently, `jsx`, `react`, `storybook` are supported.
 * @property {string[]} [ignores]
 * Patterns to ignore. Default is `['node_modules', 'dist']`.
 */

const tsExtensions = ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'];

const jsExtensions = ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'];

/** @type {Required<Pick<Options, 'level' | 'performance' | 'ignores'>>} */
const defaultOptions = {
  level: 'error',
  performance: 'ci',
  ignores: ['node_modules', 'dist'],
};

/**
 * @template T
 * @param {T[]} values
 * @returns {T[]}
 */
function unique(values) {
  return [...new Set(values)];
}

/**
 * @param {import('./types').PerformanceProfile} performance
 * @returns {import('./types').ParserOptions}
 */
function defaultParserOptions(performance) {
  return {
    projectService: performance !== 'local',
    tsconfigRootDir: import.meta.dirname,
  };
}

/**
 * @param {import('./types').Preset[]} presets
 * @returns {Omit<Options, 'presets'>}
 */
function mergePresets(presets) {
  return presets.reduce(
    (merged, preset) => ({
      level: preset.level ?? merged.level,
      parserOptions: {
        ...merged.parserOptions,
        ...preset.parserOptions,
      },
      ignoredRules: [...merged.ignoredRules, ...(preset.ignoredRules ?? [])],
      restrictedSyntaxes: [
        ...merged.restrictedSyntaxes,
        ...(preset.restrictedSyntaxes ?? []),
      ],
      envs: [...merged.envs, ...(preset.envs ?? [])],
      extensions: [...merged.extensions, ...(preset.extensions ?? [])],
      ignores: [...merged.ignores, ...(preset.ignores ?? [])],
      performance: preset.performance ?? merged.performance,
    }),
    {
      ignoredRules: [],
      restrictedSyntaxes: [],
      envs: [],
      extensions: [],
      ignores: [],
    },
  );
}

/**
 * @param {Options} options
 */
function resolveOptions(options) {
  const presetOptions = mergePresets(options.presets ?? []);
  const performance =
    options.performance ??
    presetOptions.performance ??
    defaultOptions.performance;

  if (performance !== 'ci' && performance !== 'local') {
    throw new TypeError(`Unknown ESLint performance profile: ${performance}`);
  }

  return {
    level: options.level ?? presetOptions.level ?? defaultOptions.level,
    parserOptions: {
      ...defaultParserOptions(performance),
      ...presetOptions.parserOptions,
      ...options.parserOptions,
    },
    ignoredRules: unique([
      ...(presetOptions.ignoredRules ?? []),
      ...(options.ignoredRules ?? []),
      ...(performance === 'local' ? expensiveRules : []),
    ]),
    restrictedSyntaxes: [
      ...(presetOptions.restrictedSyntaxes ?? []),
      ...(options.restrictedSyntaxes ?? []),
    ],
    envs: unique([...(presetOptions.envs ?? []), ...(options.envs ?? [])]),
    extensions: [
      ...(presetOptions.extensions ?? []),
      ...(options.extensions ?? []),
    ],
    ignores:
      options.ignores === undefined
        ? unique([...defaultOptions.ignores, ...(presetOptions.ignores ?? [])])
        : unique([...(presetOptions.ignores ?? []), ...options.ignores]),
  };
}

/**
 * @param {Options} options
 */
export default function config(options = {}) {
  const {
    level,
    parserOptions,
    ignoredRules,
    restrictedSyntaxes,
    envs,
    extensions,
    ignores,
  } = resolveOptions(options);

  const rulesOptions = {
    level,
    ignoredRules: new Set(ignoredRules),
  };

  return defineConfig(
    globalIgnores(ignores),
    {
      languageOptions: {
        parser: tseslint.parser,
        parserOptions,
        globals: Object.assign({}, ...envs.map((env) => globals[env])),
      },
      files: [...jsExtensions, ...tsExtensions],
      plugins: {
        '@typescript-eslint': tseslint.plugin,
        unicorn: unicornPlugin,
        // @ts-ignore
        'import-x': importX,
      },
      rules: rules(baseRules, rulesOptions),
      settings: {
        'import-x/extensions': jsExtensions,
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
          projectService: false,
        },
      },
      files: jsExtensions,
      rules: {
        ...rules(
          [...extendedTypedRules, ...extendedRules].map((ruleDef) =>
            addTypeScriptPrefix(ruleDef),
          ),
          {
            ...rulesOptions,
            level: 'off',
          },
        ),
        ...rules([...jsExtendedTypedRules, ...jsExtendedRules], rulesOptions),
        ...rules(jsOnlyRules, rulesOptions),
      },
    },
    ...extensions.flatMap((extension) => extension(rulesOptions)),
  );
}
