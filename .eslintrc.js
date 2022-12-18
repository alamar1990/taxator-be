module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  plugins: ['hexagonal-architecture'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  overrides: [
    {
      files: ['contexts/{backend,frontend}/*/src/**/*.ts'],
      rules: {
        'hexagonal-architecture/enforce': ['error']
      }
    }
  ],
  env: {
    es6: true,
    node: true
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        semi: false,
        singleQuote: true,
        trailingComma: 'none',
        tabWidth: 2,
        arrowParens: 'always',
        endOfLine: 'auto',
        'max-len': ['error', { code: 120 }]
      }
    ],
    'class-methods-use-this': 'off',
    'no-unused-vars': 'off',
    'lines-between-class-members': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/order': 'off'
  }
}
