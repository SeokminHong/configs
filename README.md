# Configs

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
  extensions: [react()],
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
