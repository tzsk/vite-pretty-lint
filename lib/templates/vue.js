export const packages = ['vue-eslint-parser', 'eslint-plugin-vue'];

export const eslintOverrides = [
  {
    files: ['*.js'],
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  },
  {
    files: ['*.vue'],
    parser: 'vue-eslint-parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
      'plugin:prettier/recommended',
    ],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
];
