import { ESLint } from 'eslint';

const eslint = new ESLint();

export default async function getFixtures(rule: string) {
  const results = await eslint.lintFiles(`src/${rule}.ts`);
  if (results.length !== 1) {
    throw new Error('Too many files matched');
  }
  return results[0]?.messages ?? [];
}
