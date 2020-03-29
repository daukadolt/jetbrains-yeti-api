module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single', {'allowTemplateLiterals': true }],
    'indent': ['error', 4],
    'max-len': ['error', 120],
    'no-underscore-dangle': ['error', { 'allow': ['_id'] }],
  },
  ignorePatterns: ['node_modules', 'jest.config.js'],
};
