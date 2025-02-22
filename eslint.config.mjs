import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: { ...globals.browser, process: 'readonly' } } },
  {
    settings: {
      react: {
        version: '18.3.1'
      }
    }
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
  {
    files: ['**/*.test.js'],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    },
    rules: {
      'no-undef': 'off',
      'jest/no-mocks-import': 'off'
    }
  }
];
