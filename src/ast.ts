import { CallExpression, Identifier, ImportDeclaration } from '@babel/types';

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
} as ImportDeclaration;

export const eslintPluginCall = {
  type: 'CallExpression',
  callee: {
    type: 'Identifier',
    name: 'eslintPlugin',
  },
  arguments: [],
} as CallExpression;

export const blankLine = {
  type: 'Identifier',
  name: '\n',
} as Identifier;
