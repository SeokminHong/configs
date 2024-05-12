import eslint from './utils/eslint.js';

eslint('no-compare-neg-zero', [
  {
    ruleId: 'no-compare-neg-zero',
    severity: 2,
    message: "Do not use the '===' operator to compare against -0.",
    line: 3,
    column: 5,
    nodeType: 'BinaryExpression',
    messageId: 'unexpected',
    endLine: 3,
    endColumn: 13,
  },
]);
