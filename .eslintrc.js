/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    'plugin:@flaminc/recommended',
    'plugin:@flaminc/node',
    'plugin:@flaminc/react',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:@flaminc/vitest',
  ],
  parserOptions: {
    project: './tsconfig.lint.json',
  },
  rules: {
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          props: false,
        },
      },
    ],
    'security/detect-object-injection': 'off',
  },
}
