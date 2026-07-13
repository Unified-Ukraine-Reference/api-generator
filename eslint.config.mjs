import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default [
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,jsx}'],
    languageOptions: { globals: globals.node },
  },
  pluginJs.configs.recommended,
  eslintPluginPrettier,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,jsx}'],
    rules: {
      'capitalized-comments': ['error', 'always'],
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
];
