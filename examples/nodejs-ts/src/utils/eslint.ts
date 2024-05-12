import type { Linter } from 'eslint';
import { ESLint } from 'eslint';
import { expect } from 'vitest';

const eslint = new ESLint();

export default async function lint(
  rule: string,
  fixtures: Linter.LintMessage[],
) {
  const results = await eslint.lintFiles(`src/${rule}.ts`);
  expect(results.length).toEqual(1);

  expect(fixtures).toMatchObject(results[0]?.messages ?? {});
}
