import eslint from './utils/eslint.js';

eslint('for-direction', [
  {
    ruleId: 'for-direction',
    severity: 2,
    message:
      'The update clause in this loop moves the variable in the wrong direction.',
    line: 1,
    column: 1,
    nodeType: 'ForStatement',
    messageId: 'incorrectDirection',
    endLine: 3,
    endColumn: 2,
  },
  {
    ruleId: 'for-direction',
    severity: 2,
    message:
      'The update clause in this loop moves the variable in the wrong direction.',
    line: 5,
    column: 1,
    nodeType: 'ForStatement',
    messageId: 'incorrectDirection',
    endLine: 7,
    endColumn: 2,
  },
  {
    ruleId: 'for-direction',
    severity: 2,
    message:
      'The update clause in this loop moves the variable in the wrong direction.',
    line: 9,
    column: 1,
    nodeType: 'ForStatement',
    messageId: 'incorrectDirection',
    endLine: 11,
    endColumn: 2,
  },
  {
    ruleId: 'for-direction',
    severity: 2,
    message:
      'The update clause in this loop moves the variable in the wrong direction.',
    line: 13,
    column: 1,
    nodeType: 'ForStatement',
    messageId: 'incorrectDirection',
    endLine: 15,
    endColumn: 2,
  },
  {
    ruleId: 'for-direction',
    severity: 2,
    message:
      'The update clause in this loop moves the variable in the wrong direction.',
    line: 18,
    column: 1,
    nodeType: 'ForStatement',
    messageId: 'incorrectDirection',
    endLine: 20,
    endColumn: 2,
  },
]);
