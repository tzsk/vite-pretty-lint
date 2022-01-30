import * as babel from '@babel/core';
import { blankLine, eslintImport, eslintPluginCall } from './ast.js';

export const commonPackages = [
  'eslint',
  'prettier',
  'eslint-plugin-prettier',
  'eslint-config-prettier',
  'vite-plugin-eslint',
];

export const eslintConfig = {
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

export function viteEslint(code) {
  const ast = babel.parseSync(code, {
    sourceType: 'module',
    comments: false,
  });
  const { program } = ast;

  const importList = program.body
    .filter((body) => {
      return body.type === 'ImportDeclaration';
    })
    .map((body) => {
      delete body.trailingComments;
      return body;
    });

  if (importList.find((body) => body.source.value === 'vite-plugin-eslint')) {
    return code;
  }

  const nonImportList = program.body.filter((body) => {
    return body.type !== 'ImportDeclaration';
  });
  const exportStatement = program.body.find(
    (body) => body.type === 'ExportDefaultDeclaration'
  );

  if (exportStatement.declaration.type === 'CallExpression') {
    const [argument] = exportStatement.declaration.arguments;
    if (argument.type === 'ObjectExpression') {
      const plugin = argument.properties.find(
        ({ key }) => key.name === 'plugins'
      );

      if (plugin) {
        plugin.value.elements.push(eslintPluginCall);
      }
    }
  }

  importList.push(eslintImport);
  importList.push(blankLine);
  program.body = importList.concat(nonImportList);

  ast.program = program;

  return babel.transformFromAstSync(ast, code, { sourceType: 'module' }).code;
}
