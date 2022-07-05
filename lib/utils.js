import enquirer from 'enquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getOptions() {
  const OPTIONS = [];
  fs.readdirSync(path.join(__dirname, 'templates')).forEach((template) => {
    const { name } = path.parse(path.join(__dirname, 'templates', template));

    OPTIONS.push(name);
  });
  return OPTIONS;
}

export function askForProjectType() {
  return enquirer.prompt([
    {
      type: 'select',
      name: 'projectType',
      message: 'What type of project do you have?',
      choices: getOptions(),
    },
    {
      type: 'select',
      name: 'packageManager',
      message: 'What package manager do you use?',
      choices: ['npm', 'yarn', 'pnpm'],
    },
  ]);
}
