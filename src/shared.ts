import * as babel from '@babel/core';
import { blankLine, eslintImport, eslintPluginCall } from './ast.js';

export const commonPackages = [
  'eslint',
  'prettier',
  'eslint-plugin-prettier',
  'eslint-config-prettier',
  'vite-plugin-eslint',
];

import type { ImportDeclaration, ExportDefaultDeclaration, CallExpression, ObjectExpression, ObjectProperty, Identifier } from '@babel/types';

export const eslintConfig: {
  env: Record<string, boolean>;
  overrides: Record<string, unknown>[];
} = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  overrides: [],
};

export const prettierConfig = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
};

export const eslintIgnore = ['node_modules', 'dist'];

export function viteEslint(code: string): string {
  const ast = babel.parseSync(code, {
    sourceType: 'module',
    comments: false,
  });

  if (!ast || !ast.program) {
    return code;
  }

  const { program } = ast;

  const importList = program.body
    .filter((body) => {
      return body.type === 'ImportDeclaration';
    })
    .map((body) => {
      if (body.type === 'ImportDeclaration') {
         body.trailingComments = null;
      }
      return body;
    }) as ImportDeclaration[];

  if (
    importList.find(
      (body) => body.source && body.source.value === 'vite-plugin-eslint'
    )
  ) {
    return code;
  }

  const nonImportList = program.body.filter((body) => {
    return body.type !== 'ImportDeclaration';
  });

  const exportStatement = program.body.find(
    (body) => body.type === 'ExportDefaultDeclaration'
  ) as ExportDefaultDeclaration | undefined;

  if (exportStatement && exportStatement.declaration.type === 'CallExpression') {
    const callExp = exportStatement.declaration as CallExpression;
    const argument = callExp.arguments[0];

    if (argument && argument.type === 'ObjectExpression') {
      const objExp = argument as ObjectExpression;
      const plugin = objExp.properties.find(
        (prop) =>
          prop.type === 'ObjectProperty' &&
          prop.key.type === 'Identifier' &&
          prop.key.name === 'plugins'
      ) as ObjectProperty | undefined;

      if (plugin && plugin.value.type === 'ArrayExpression') {
        plugin.value.elements.push(eslintPluginCall);
      }
    }
  }

  const finalBody = [...importList, eslintImport, blankLine, ...nonImportList];
  program.body = finalBody as babel.types.Statement[];

  ast.program = program;

  const transformed = babel.transformFromAstSync(ast, code, {
    sourceType: 'module',
  });
  return transformed ? transformed.code || code : code;
}
