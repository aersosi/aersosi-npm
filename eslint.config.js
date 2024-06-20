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
    rules: {
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          format: ['camelCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'],
        },
      ],
    },
  },
  ...tseslint.configs.recommended,
);
