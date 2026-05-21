# Configs

## ESLint policy

This package provides strict ESLint configs while avoiding rules that are
better owned by TypeScript, Prettier, or another dedicated tool.

- ESLint rules should catch correctness, safety, accessibility, React runtime,
  import, and maintainability issues that TypeScript or Prettier do not already
  report clearly.
- TypeScript-owned diagnostics are not duplicated in ESLint unless the ESLint
  rule gives materially better project-level feedback.
- Formatting and code-shape preferences that are already handled by Prettier are
  not enforced by ESLint.
- Opinionated rules may be disabled when the project deliberately allows the
  pattern. The reason must be documented in `docs/eslint-rules.md`.
- Presets are the preferred public interface for common project shapes. They
  may bundle environments, extensions, ignored rules, and performance policy.
  Lower-level extensions remain available when a project needs manual
  composition.
- Expensive rules are classified separately. They stay enabled by default, but
  projects may use the `local` performance profile to disable them locally and
  keep them enabled in CI.
- Example projects under `examples/` are verification fixtures for this package.
  They should stay minimal, reproducible, and excluded from the published
  package.

## How to use

### 1. Install the package

```sh
pnpm add -D @seokminhong/configs eslint prettier typescript
```

### 2. Set the configs

#### ESLint

```js
// eslint.config.js
import config from '@seokminhong/configs/eslint';

export default config();
```

#### ESLint (React)

```js
// eslint.config.js
import config from '@seokminhong/configs/eslint';
import { react } from '@seokminhong/configs/eslint/presets';

const mode = process.env.CI ? 'full' : 'light';

export default config({
  presets: [react({ allowConstantExport: true, mode })],
});
```

Available presets are exported from `@seokminhong/configs/eslint/presets`:

- `node()`: Node globals.
- `browser()`: browser globals.
- `jsx()`: browser globals and JSX a11y for non-React JSX runtimes such as
  Qwik and Solid.
- `react()`: browser globals, React, React Hooks, React Refresh, and JSX a11y.
- `storybook()`: Storybook story and `.storybook/main` rules.

Each preset accepts `mode: 'full' | 'light'`. `full` keeps the complete rule set
enabled. `light` disables the exported `expensiveRules` group and turns off
TypeScript project service by default. The lower-level `performance: 'ci' |
'local'` option is still available directly on `config()`.

#### ESLint (manual extension composition)

```js
// eslint.config.js
import config from '@seokminhong/configs/eslint';
import react from '@seokminhong/configs/eslint/react';

export default config({
  envs: ['browser', 'node'],
  extensions: [react({ allowConstantExport: true })],
});
```

#### Prettier

```jsonc
// .prettierrc
"@seokminhong/configs/prettier"
```

#### TSConfig

```jsonc
{
  "extends": "@seokminhong/config/tsconfig/node",
}
```

## TODO

- [ ] Provides Node.js ESLint rules
- [ ] Provides testing ESLint rules
- [ ] Supports Deno

## References

- [TSConfig Bases](https://github.com/tsconfig/bases?)
- [ESLint Flat Config](https://eslint.org/docs/v8.x/use/configure/configuration-files-new)
- [TypeScript ESLint Config](https://typescript-eslint.io/getting-started/typed-linting)
- [eslint-plugin-hardcore](https://github.com/EvgenyOrekhov/eslint-config-hardcore/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)
