export const packages = ['eslint-plugin-react'];

export const eslintOverrides = [
  {
    files: ['*.js', '*.jsx'],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:prettier/recommended',
    ],
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
];
