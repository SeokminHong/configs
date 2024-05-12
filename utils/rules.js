// @ts-check

/**
 * @param {import('../types').RuleDef[]} ruleDefs
 * @param {import('../types').RuleLevel} level
 * @returns {Record<string, import('../types').RuleEntry>}
 */
export default function rules(ruleDefs, level) {
  return Object.fromEntries(
    ruleDefs.map((ruleDef) =>
      typeof ruleDef === 'string'
        ? [ruleDef, level]
        : [ruleDef[0], [level, ...ruleDef.slice(1)]],
    ),
  );
}
