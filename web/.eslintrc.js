module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.jsx', '.js'] }
    ],
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-console': 'off',
    'no-param-reassign':'off',
    'no-underscore-dangle':'off',
    'no-alert': 'off'
  },
  settings:{
    'import/resolver':{
      'babel-plugin-root-import': {
        rootPathSuffix: "src"
      },
    },
  }
};
