export const eslintImport: any = {
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

export const eslintPluginCall: any = {
  type: 'CallExpression',
  callee: {
    type: 'Identifier',
    name: 'eslintPlugin',
  },
  arguments: [],
};

export const blankLine: any = {
  type: 'Identifier',
  name: '\n',
};
