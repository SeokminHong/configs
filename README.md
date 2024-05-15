# Configs

## How to use

### 1. Install the package

```sh
npm install @seokminhong/configs
npm install eslint@^8 # If needed
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
  "extends": ["@seokminhong/config/tsconfig/node"],
}
```
