import eslint from './utils/eslint.js';

eslint('no-await-in-loop', [
  {
    ruleId: 'no-await-in-loop',
    severity: 2,
    message: 'Unexpected `await` inside a loop.',
    line: 5,
    column: 18,
    nodeType: 'AwaitExpression',
    messageId: 'unexpectedAwait',
    endLine: 5,
    endColumn: 34,
  },
]);
