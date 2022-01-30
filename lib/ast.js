export const eslintImport = {
  type: 'ImportDeclaration',
  specifiers: [
    {
      type: 'ImportDefaultSpecifier',
      local: {
        type: 'Identifier',
        name: 'eslintPlugin',
      },
    },
  ],
  source: {
    type: 'StringLiteral',
    extra: {
      rawValue: 'vite-plugin-eslint',
      raw: "'vite-plugin-eslint'",
    },
    value: 'vite-plugin-eslint',
  },
};

export const eslintPluginCall = {
  type: 'CallExpression',
  callee: {
    type: 'Identifier',
    name: 'eslintPlugin',
  },
  arguments: [],
};

export const blankLine = {
  type: 'Identifier',
  name: '\n',
};
