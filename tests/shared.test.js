import {
  commonPackages,
  eslintConfig,
  eslintIgnore,
  prettierConfig,
  viteEslint,
} from '../lib/shared';
import fs from 'fs';
import { describe, expect, test } from 'vitest';

describe('Shared', () => {
  test('Common Packages', () => {
    expect(commonPackages).toMatchSnapshot();
  });

  test('Common Eslint Config', () => {
    expect(eslintConfig).toMatchSnapshot();
  });

  test('Common Prettier Config', () => {
    expect(prettierConfig).toMatchSnapshot();
  });

  test('Common Lint Ignore', () => {
    expect(eslintIgnore).toMatchSnapshot();
  });

  test('It can configure vite config', () => {
    expect(
      viteEslint(fs.readFileSync('./tests/fixtures/react.tpl', 'utf8'))
    ).toMatchSnapshot();

    expect(
      viteEslint(fs.readFileSync('./tests/fixtures/vue.tpl', 'utf8'))
    ).toMatchSnapshot();
  });

  test('It will ignore vite config if eslint exists', () => {
    expect(
      viteEslint(fs.readFileSync('./tests/fixtures/exists.tpl', 'utf8'))
    ).toMatchSnapshot();
  });
});
