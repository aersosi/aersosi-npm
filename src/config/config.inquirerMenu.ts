import { themeColors } from './config.themeColors.js';
import { pageExtraName } from './config.pageExtra.js';
import { defaultCvContent } from '../default/default.cvContent.js';
import { log } from '../core/functions.helper.js';
import chalk from 'chalk';

// Attempt to import custom CV content, fallback to default if not found
let configCvContent = {};
try {
  configCvContent = (await import('./config.cvContent.js')).configCvContent;
} catch {
  log('Custom CV content not found, using default content.');
}

// Use custom CV content if available, otherwise use default
const cvContent = Object.keys(configCvContent).length > 0 ? configCvContent : defaultCvContent;

// Configuration for the main menu options
const menuIndexOptions = {
  type: 'list',
  prefix: '',
  name: 'cvOptions',
  message: chalk.reset.dim.italic('  What do you want to know?'),
  choices: [pageExtraName, ...Object.keys(cvContent), themeColors.shade_3('Exit')],
  loop: false,
};

// Configuration for the back menu options
const menuBackOptions = {
  type: 'list',
  prefix: '',
  name: 'menuBack',
  message: chalk.reset.dim.italic('  Go back or Exit?'),
  choices: ['Back', themeColors.shade_3('Exit')],
  loop: false,
};

// ASCII art title configuration
const titleAsciiText = 'Index';
const titleAsciiPadding = 2;

// Subtitle configuration
const subtitleAsciiText = '  Hello, my name is Arthur Ersosi. Welcome to my resume!';
const subtitleAsciiColor = themeColors.shade_3;

const menuConfig = {
  menuIndexOptions,
  menuBackOptions,
  titleAsciiText,
  titleAsciiPadding,
  subtitleAsciiText,
  subtitleAsciiColor,
};

export default menuConfig;
