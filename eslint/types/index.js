// @ts-check

/**
 * @typedef {string | [string, ...unknown[]]} RuleDef
 * @typedef {import('@typescript-eslint/utils').TSESLint.SharedConfig.RuleLevel} RuleLevel
 * @typedef {import('@typescript-eslint/utils').TSESLint.SharedConfig.RuleEntry} RuleEntry
 * @typedef {import('@typescript-eslint/types').ParserOptions} ParserOptions
 *
 * @typedef {string | {selector: string, message: string}} RestrictSyntax
 * @typedef {{name: string, plugin: import('eslint').ESLint.Plugin}} PluginDef
 * @typedef {'ci' | 'local'} PerformanceProfile
 * @typedef {'full' | 'light'} PresetMode
 * @typedef {{level: RuleLevel, ignoredRules: Set<string>}} RulesOptions
 * @typedef {(rulesOptions: RulesOptions) => import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} Extension
 * @typedef {Object} Preset
 * @property {RuleLevel} [level]
 * @property {ParserOptions} [parserOptions]
 * @property {string[]} [ignoredRules]
 * @property {RestrictSyntax[]} [restrictedSyntaxes]
 * @property {(keyof import('globals'))[]} [envs]
 * @property {Extension[]} [extensions]
 * @property {string[]} [ignores]
 * @property {PerformanceProfile} [performance]
 */

export {};
