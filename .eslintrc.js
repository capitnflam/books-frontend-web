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
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
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
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
  overrides: [
    {
      files: ['src/components/ui/**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
    {
      files: ['*.tsx'],
      rules: {
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],
      },
    },
  ],
}
