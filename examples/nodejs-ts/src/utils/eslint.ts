import type { Linter } from 'eslint';
import { ESLint } from 'eslint';
import { expect, it } from 'vitest';

const linter = new ESLint();

export default function eslint(
  rule: string,
  fixtures: Linter.LintMessage[],
): void {
  it(rule, async () => {
    const results = await linter.lintFiles(`src/${rule}.ts`);
    expect(results.length).toEqual(1);

    expect(fixtures).toMatchObject(results[0]?.messages ?? {});
  });
}
