import eslint from './utils/eslint.js';

eslint('no-async-promise-executor', [
  {
    ruleId: 'no-async-promise-executor',
    severity: 2,
    message: 'Promise executor functions should not be async.',
    line: 3,
    column: 25,
    nodeType: 'Identifier',
    messageId: 'async',
    endLine: 3,
    endColumn: 30,
  },
  {
    ruleId: 'no-async-promise-executor',
    severity: 2,
    message: 'Promise executor functions should not be async.',
    line: 14,
    column: 35,
    nodeType: 'Identifier',
    messageId: 'async',
    endLine: 14,
    endColumn: 40,
  },
]);
