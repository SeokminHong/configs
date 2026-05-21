# ESLint Active Rule Audit

This document records the active-rule overlap audit for `@seokminhong/configs`.
It covers rule-to-rule duplication, TypeScript compiler ownership, `tsconfig`
ownership, and Prettier ownership.

## Scope

The audit resolved the flat config with the base config plus the React and
Storybook extensions, then checked representative files for each supported
surface.

The default performance profile is `ci`, which keeps the full active rule set
enabled. The `local` profile disables the classified expensive rules and turns
off TypeScript project service by default so editor and local lint runs can
avoid type-aware rule cost. Projects can select the profile explicitly, usually
through preset modes such as `react({ mode: process.env.CI ? 'full' : 'light' })`.

| Surface          | Representative file    | Active rules |
| ---------------- | ---------------------- | -----------: |
| TypeScript       | `src/file.ts`          |          374 |
| TypeScript React | `src/file.tsx`         |          374 |
| JavaScript       | `src/file.js`          |          329 |
| JavaScript React | `src/file.jsx`         |          329 |
| Storybook story  | `src/file.stories.tsx` |          382 |
| Storybook main   | `.storybook/main.ts`   |          373 |

With the `local` performance profile, the same surfaces resolve to:

| Surface          | Representative file    | Active rules |
| ---------------- | ---------------------- | -----------: |
| TypeScript       | `src/file.ts`          |          321 |
| TypeScript React | `src/file.tsx`         |          321 |
| JavaScript       | `src/file.js`          |          324 |
| JavaScript React | `src/file.jsx`         |          324 |
| Storybook story  | `src/file.stories.tsx` |          329 |
| Storybook main   | `.storybook/main.ts`   |          320 |

Across all audited surfaces, 443 unique rule IDs are active:

| Source       | Active |
| ------------ | -----: |
| core         |    150 |
| typescript   |    102 |
| importX      |     18 |
| unicorn      |     79 |
| jsxA11y      |     34 |
| react        |     35 |
| reactHooks   |     13 |
| reactRefresh |      1 |
| storybook    |     11 |

## Checks

- The Vitest active-rule test suite in `tests/eslint-active-rules.test.js` is the
  executable form of this audit. It resolves the flat config for every supported
  surface and checks each active rule against plugin metadata, TypeScript/core
  overlap policy, Prettier ownership, and the `full`/`light` performance split.
- Deprecated active rules: none.
- Same-file core and `@typescript-eslint` extension duplicates: none.
- Active rules disabled by `eslint-config-prettier@10.1.8`: none.
- `curly` and `no-unexpected-multiline` remain enabled.
  `eslint-config-prettier` marks them as special rules that require separate
  review. `curly` is kept with the default `all` behavior, which does not fight
  Prettier's formatting decisions, and `no-unexpected-multiline` is kept as an
  ASI correctness guard rather than a formatting rule.
- Type import style is split across tools intentionally: Prettier groups and
  separates type imports, while
  [`import-x/consistent-type-specifier-style`](https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/consistent-type-specifier-style.md)
  remains enabled because the Prettier import sorter does not convert every
  pure inline type specifier into `import type`.
- `performance: 'local'` disables all exported `expensiveRules`. The current
  list contains 53 type-aware `@typescript-eslint` rules and 5 resolver-heavy
  JavaScript `import-x` rules. No classified expensive rule remains active in
  the audited `local` profile surfaces.

## Resolved Overlaps

- Deprecated rules were removed:
  [`no-new-symbol`](https://eslint.org/docs/latest/rules/no-new-symbol),
  [`no-return-await`](https://eslint.org/docs/latest/rules/no-return-await), and
  `react-hooks/component-hook-factories`.
- JS-only duplicate extension loading was removed. JavaScript files now use core
  rules for
  [`no-array-constructor`](https://eslint.org/docs/latest/rules/no-array-constructor),
  [`no-empty-function`](https://eslint.org/docs/latest/rules/no-empty-function),
  and
  [`no-unused-expressions`](https://eslint.org/docs/latest/rules/no-unused-expressions)
  instead of loading both the core rule and the matching
  `@typescript-eslint` extension rule.
- TypeScript unused-symbol checks are owned by `tsconfig/base.json`
  (`noUnusedLocals` and `noUnusedParameters`), so
  [`@typescript-eslint/no-unused-vars`](https://typescript-eslint.io/rules/no-unused-vars)
  is not enabled for TypeScript files. JavaScript files still use the core
  [`no-unused-vars`](https://eslint.org/docs/latest/rules/no-unused-vars) rule.
- TypeScript switch fallthrough checks are owned by `tsconfig/base.json`
  (`noFallthroughCasesInSwitch`), so
  [`no-fallthrough`](https://eslint.org/docs/latest/rules/no-fallthrough) is only
  enabled for JavaScript files.
- TypeScript deprecation checks are owned by
  [`@typescript-eslint/no-deprecated`](https://typescript-eslint.io/rules/no-deprecated),
  so
  [`import-x/no-deprecated`](https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-deprecated.md)
  is only enabled for JavaScript files.
- Prettier-owned style rules were removed from the active set:
  [`react/jsx-child-element-spacing`](https://github.com/jsx-eslint/eslint-plugin-react/tree/master/docs/rules/jsx-child-element-spacing.md)
  and
  [`unicorn/number-literal-case`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v64.0.0/docs/rules/number-literal-case.md).

## Tool Ownership

| Concern                                             | Owner                                      |
| --------------------------------------------------- | ------------------------------------------ |
| General formatting                                  | Prettier                                   |
| Import ordering                                     | `@ianvs/prettier-plugin-sort-imports`      |
| Type import grouping and mixed type/value splitting | `@ianvs/prettier-plugin-sort-imports`      |
| Remaining top-level type specifier enforcement      | `import-x/consistent-type-specifier-style` |
| TypeScript unused locals and parameters             | `tsconfig/base.json`                       |
| TypeScript switch fallthrough                       | `tsconfig/base.json`                       |
| TypeScript deprecated symbol usage                  | `@typescript-eslint/no-deprecated`         |
| JavaScript unused variables                         | core `no-unused-vars`                      |
| JavaScript switch fallthrough                       | core `no-fallthrough`                      |
| JavaScript deprecated import usage                  | `import-x/no-deprecated`                   |
