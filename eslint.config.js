import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    ignores: ['node_modules'],
  },
  ...tseslint.configs.recommended,
);
