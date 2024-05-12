import { it } from 'vitest';

import eslint from './utils/eslint.js';

it('for-direction', async () => {
  await eslint('for-direction', [
    {
      ruleId: 'for-direction',
      severity: 2,
      message:
        'The update clause in this loop moves the variable in the wrong direction.',
      line: 1,
      column: 1,
      nodeType: 'ForStatement',
      messageId: 'incorrectDirection',
      endLine: 1,
      endColumn: 32,
    },
    {
      ruleId: 'for-direction',
      severity: 2,
      message:
        'The update clause in this loop moves the variable in the wrong direction.',
      line: 3,
      column: 1,
      nodeType: 'ForStatement',
      messageId: 'incorrectDirection',
      endLine: 3,
      endColumn: 33,
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
      endLine: 5,
      endColumn: 32,
    },
    {
      ruleId: 'for-direction',
      severity: 2,
      message:
        'The update clause in this loop moves the variable in the wrong direction.',
      line: 7,
      column: 1,
      nodeType: 'ForStatement',
      messageId: 'incorrectDirection',
      endLine: 7,
      endColumn: 32,
    },
    {
      ruleId: 'for-direction',
      severity: 2,
      message:
        'The update clause in this loop moves the variable in the wrong direction.',
      line: 10,
      column: 1,
      nodeType: 'ForStatement',
      messageId: 'incorrectDirection',
      endLine: 10,
      endColumn: 35,
    },
  ]);
});
