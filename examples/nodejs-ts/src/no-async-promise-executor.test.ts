import { it } from 'vitest';

import eslint from './utils/eslint.js';

it('no-async-promise-executor', async () => {
  await eslint('no-async-promise-executor', [
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
      line: 13,
      column: 29,
      nodeType: 'Identifier',
      messageId: 'async',
      endLine: 13,
      endColumn: 34,
    },
  ]);
});
