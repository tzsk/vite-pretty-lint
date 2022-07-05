#!/usr/bin/env node

import chalk from 'chalk';
import gradient from 'gradient-string';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { createSpinner } from 'nanospinner';
import {
  commonPackages,
  eslintConfig,
  eslintIgnore,
  prettierConfig,
  viteEslint,
} from './shared.js';
import { askForProjectType } from './utils.js';

const projectDirectory = process.cwd();

const eslintFile = path.join(projectDirectory, '.eslintrc.json');
const prettierFile = path.join(projectDirectory, '.prettierrc.json');
const eslintIgnoreFile = path.join(projectDirectory, '.eslintignore');

async function run() {
  console.log(
    chalk.bold(
      gradient.morning('\n🚀 Welcome to Eslint & Prettier Setup for Vite!\n')
    )
  );
  let projectType, packageManager;

  try {
    const answers = await askForProjectType();
    projectType = answers.projectType;
    packageManager = answers.packageManager;
  } catch (error) {
    console.log(chalk.blue('\n👋 Goodbye!'));
    return;
  }
  const { packages, eslintOverrides } = await import(
    `./templates/${projectType}.js`
  );

  const packageList = [...commonPackages, ...packages];
  const eslintConfigOverrides = [...eslintConfig.overrides, ...eslintOverrides];
  const eslint = { ...eslintConfig, overrides: eslintConfigOverrides };

  const commandMap = {
    npm: `npm install --save-dev ${packageList.join(' ')}`,
    yarn: `yarn add --dev ${packageList.join(' ')}`,
    pnpm: `pnpm install --save-dev ${packageList.join(' ')}`
  };
  const viteJs = path.join(projectDirectory, 'vite.config.js');
  const viteTs = path.join(projectDirectory, 'vite.config.ts');
  const viteMap = {
    vue: viteJs,
    react: viteJs,
    'vue-ts': viteTs,
    'react-ts': viteTs,
  };

  const viteFile = viteMap[projectType];
  const viteConfig = viteEslint(fs.readFileSync(viteFile, 'utf8'));
  const installCommand = commandMap[packageManager];

  if (!installCommand) {
    console.log(chalk.red('\n✖ Sorry, we only support npm、yarn and pnpm!'));
    return;
  }

  const spinner = createSpinner('Installing packages...').start();
  exec(`${commandMap[packageManager]}`, { cwd: projectDirectory }, (error) => {
    if (error) {
      spinner.error({
        text: chalk.bold.red('Failed to install packages!'),
        mark: '✖',
      });
      console.error(error);
      return;
    }

    fs.writeFileSync(eslintFile, JSON.stringify(eslint, null, 2));
    fs.writeFileSync(prettierFile, JSON.stringify(prettierConfig, null, 2));
    fs.writeFileSync(eslintIgnoreFile, eslintIgnore.join('\n'));
    fs.writeFileSync(viteFile, viteConfig);

    spinner.success({ text: chalk.bold.green('All done! 🎉'), mark: '✔' });
    console.log(
      chalk.bold.cyan('\n🔥 Reload your editor to activate the settings!')
    );
  });
}

run().catch((e) => {
  console.error(e);
});
