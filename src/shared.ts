import * as babel from '@babel/core';
import { blankLine, eslintImport, eslintPluginCall } from './ast.js';

export const commonPackages = [
  'eslint',
  'prettier',
  'eslint-plugin-prettier',
  'eslint-config-prettier',
  'vite-plugin-eslint',
];

export const eslintConfig: { env: any; overrides: any[] } = {
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
    .filter((body: any) => {
      return body.type === 'ImportDeclaration';
    })
    .map((body: any) => {
      delete body.trailingComments;
      return body;
    });

  if (importList.find((body: any) => body.source.value === 'vite-plugin-eslint')) {
    return code;
  }

  const nonImportList = program.body.filter((body: any) => {
    return body.type !== 'ImportDeclaration';
  });
  const exportStatement = program.body.find(
    (body: any) => body.type === 'ExportDefaultDeclaration'
  ) as any;

  if (exportStatement && exportStatement.declaration.type === 'CallExpression') {
    const [argument] = exportStatement.declaration.arguments;
    if (argument && argument.type === 'ObjectExpression') {
      const plugin = argument.properties.find(
        ({ key }: any) => key && key.name === 'plugins'
      );

      if (plugin) {
        plugin.value.elements.push(eslintPluginCall);
      }
    }
  }

  importList.push(eslintImport as any);
  importList.push(blankLine as any);
  program.body = importList.concat(nonImportList);

  ast.program = program;

  const transformed = babel.transformFromAstSync(ast, code, { sourceType: 'module' });
  return transformed ? transformed.code || code : code;
}
