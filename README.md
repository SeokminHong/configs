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
