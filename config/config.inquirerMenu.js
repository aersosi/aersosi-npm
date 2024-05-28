import { themeColors } from './config.themeColors.js';
import { extraPageName } from './config.extraPage.js';
import { defaultCvContent } from '../private/default.cvContent.js';
import { log } from '../core/functions.helper.js';

let configCvContent = {};
try {
  configCvContent = (await import('../config/config.cvContent.js')).configCvContent;
} catch {
  log('Custom CV content not found, using default content.');
}

const cvContent = Object.keys(configCvContent).length > 0 ? configCvContent : defaultCvContent;

const menuIndexOptions = {
  type: 'list',
  name: 'resumeOptions',
  message: 'What do you want to know about me?',
  choices: [extraPageName, ...Object.keys(cvContent), themeColors.shade5('Exit')],
  loop: false,
};

const menuBackExitOptions = {
  type: 'list',
  prefix: '',
  name: 'menuBack',
  message: 'Go back or Exit?',
  choices: ['Back', themeColors.shade5('Exit')],
  loop: false,
};

const titleAsciiText = 'Index';
const titleAsciiPadding = 2;

const subtitleAsciiText = '  Hello, my name is Arthur Ersosi. Welcome to my resume!';
const subtitleAsciiColor = themeColors.shade5;

const menuConfig = {
  menuIndexOptions,
  menuBackExitOptions,
  titleAsciiText,
  titleAsciiPadding,
  subtitleAsciiText,
  subtitleAsciiColor,
};

export default menuConfig;
