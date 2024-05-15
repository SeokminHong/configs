// @ts-check

/**
 * @typedef {import('../types').RuleLevel} RuleLevel
 */

/**
 * @param {import('../types').RuleDef[]} ruleDefs
 * @param {Object} option
 * @param {import('../types').RuleLevel} option.level
 * @param {boolean} option.fullMode
 * @param {Set<string>} option.fullModeOnlyRules
 * @returns {Record<string, import('../types').RuleEntry>}
 */
export default function rules(
  ruleDefs,
  { level, fullMode, fullModeOnlyRules },
) {
  const ruleEntries = ruleDefs.map(
    /**
     * @returns {[string, RuleLevel | [RuleLevel, ...unknown[]]]}
     */
    (ruleDef) => {
      if (typeof ruleDef === 'string') {
        return [ruleDef, level];
      }
      if (ruleDef[0] === 'full') {
        return [
          /** @type {string} */ (ruleDef[1]),
          [level, ...ruleDef.slice(2)],
        ];
      }
      return [ruleDef[0], [level, ...ruleDef.slice(1)]];
    },
  );
  return Object.fromEntries(
    fullMode
      ? ruleEntries
      : ruleEntries.filter(([ruleDef]) => !fullModeOnlyRules.has(ruleDef)),
  );
}
