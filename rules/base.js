// @ts-check

/**
 * @typedef {import('../types').RuleDef} RuleDef
 */

/**
 * ESLint rules extended from TypeScript ESLint but need type information.
 * For JavaScript files, unextended versions will be used.
 * @type {RuleDef[]}
 */
export const extendedRules = ['no-implied-eval'];

/**
 * Rules for JavaScript
 * @type {RuleDef[]}
 */
export const jsOnlyRules = [
  ['array-callback-return', { checkForEach: true, allowVoid: true }],
];

/**
 * Rules for TypeScript
 * @type {RuleDef[]}
 */
export const tsOnlyRules = ['@typescript-eslint/await-thenable'];

/**
 * Common rules
 * @type {RuleDef[]}
 */
export const baseRules = [
  ...extendedRules.map(addPrefix),
  'constructor-super',
  'for-direction',
  'getter-return',
  'no-async-promise-executor',
  'no-await-in-loop',
];

/**
 * @param {RuleDef} ruleDef
 * @returns {RuleDef}
 */
export function addPrefix(ruleDef) {
  return typeof ruleDef === 'string'
    ? `@typescript-eslint/${ruleDef}`
    : [`@typescript-eslint/${ruleDef[0]}`, ...ruleDef.slice(1)];
}
