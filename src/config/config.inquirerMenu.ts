import { themeColors } from './config.themeColors.js';
import { pageExtraName } from './config.pageExtra.js';
import { defaultCvContent } from '../default/default.cvContent.js';
import { log } from '../core/functions.helper.js';
import chalk from 'chalk';

let configCvContent = {};
try {
  configCvContent = (await import('./config.cvContent.js')).configCvContent;
} catch {
  log('Custom CV content not found, using default content.');
}

const cvContent = Object.keys(configCvContent).length > 0 ? configCvContent : defaultCvContent;

const menuIndexOptions = {
  type: 'list',
  prefix: '',
  name: 'cvOptions',
  message: chalk.reset.dim.italic('  What do you want to know?'),
  choices: [pageExtraName, ...Object.keys(cvContent), themeColors.shade3('Exit')],
  loop: false,
};

const menuBackOptions = {
  type: 'list',
  prefix: '',
  name: 'menuBack',
  message: chalk.reset.dim.italic('  Go back or Exit?'),
  choices: ['Back', themeColors.shade3('Exit')],
  loop: false,
};

const titleAsciiText = 'Index';
const titleAsciiPadding = 2;

const subtitleAsciiText = '  Hello, my name is Arthur Ersosi. Welcome to my resume!';
const subtitleAsciiColor = themeColors.shade3;

const menuConfig = {
  menuIndexOptions,
  menuBackOptions,
  titleAsciiText,
  titleAsciiPadding,
  subtitleAsciiText,
  subtitleAsciiColor,
};

export default menuConfig;
