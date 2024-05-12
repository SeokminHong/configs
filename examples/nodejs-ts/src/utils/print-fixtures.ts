import { ESLint } from 'eslint';
import { it } from 'vitest';

const eslint = new ESLint();

export default function printFixtures(rule: string) {
  it(rule, async () => {
    const results = await eslint.lintFiles(`src/${rule}.ts`);
    if (results.length !== 1) {
      throw new Error('Too many files matched');
    }
    // eslint-disable-next-line no-console
    console.log(results[0]?.messages);
  });
}
