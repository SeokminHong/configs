// @ts-check

/**
 * @typedef {import('../types').RuleLevel} RuleLevel
 */

/**
 * @param {import('../types').RuleDef[]} ruleDefs
 * @param {Object} option
 * @param {import('../types').RuleLevel} option.level
 * @param {Set<string>} option.ignoredRules
 * @returns {Record<string, import('../types').RuleEntry>}
 */
export default function rules(ruleDefs, { level, ignoredRules }) {
  const ruleEntries = ruleDefs.map((ruleDef) =>
    typeof ruleDef === 'string'
      ? /** @type {[string, RuleLevel]} */ ([ruleDef, level])
      : /** @type {[string, [RuleLevel, ...unknown[]]]} */ ([
          ruleDef[0],
          [level, ...ruleDef.slice(1)],
        ]),
  );
  return Object.fromEntries(
    ruleEntries.filter(([ruleDef]) => !ignoredRules.has(ruleDef)),
  );
}
