// @ts-check

/**
 * @typedef {string | [string, ...unknown[]]} RuleDef
 * @typedef {import('@typescript-eslint/utils').TSESLint.SharedConfig.RuleLevel} RuleLevel
 * @typedef {import('@typescript-eslint/utils').TSESLint.SharedConfig.RuleEntry} RuleEntry
 * @typedef {import('@typescript-eslint/types').ParserOptions} ParserOptions
 *
 * @typedef {string | {selector: string, message: string}} RestrictSyntax
 * @typedef {{name: string, plugin: import('eslint').ESLint.Plugin}} PluginDef
 * @typedef {{level: RuleLevel, ignoredRules: Set<RuleDef>}} RulesOptions
 * @typedef {(rulesOptions: RulesOptions) => import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} Extension
 */

export {};
