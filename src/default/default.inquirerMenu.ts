import { defaultCvContent } from './default.cvContent.js';
import { themeColors } from './default.themeColors.js';
import { log } from '../core/functions.helper.js';

// Import custom CV content, fallback to default if not found
let configCvContent = {};
try {
  configCvContent = (await import('../config/config.cvContent.js')).configCvContent;
} catch {
  log('Custom CV content not found, using default content.');
}

// Use custom CV content if available, otherwise use default
const cvContent = Object.keys(configCvContent).length > 0 ? configCvContent : defaultCvContent;

// Configuration for the main menu options
export const menuIndexOptions = {
  type: 'list',
  name: 'cvOptions',
  message: 'What do you want to know about me?',
  choices: [...Object.keys(cvContent), 'Exit'],
};

// Configuration for the back menu options
export const menuBackOptions = {
  type: 'list',
  name: 'menuBack',
  message: 'Go back or Exit?',
  choices: ['Back', 'Exit'],
};

// ASCII art title configuration
export const titleAsciiText = 'Index';
export const titleAsciiPadding = null;

// Subtitle configuration
export const subtitleAsciiText = 'Welcome to my resume!';
export const subtitleAsciiColor = themeColors.shade_3;

const defaultMenuConfig = {
  menuIndexOptions,
  menuBackOptions,
  titleAsciiText,
  titleAsciiPadding,
  subtitleAsciiText,
  subtitleAsciiColor,
};

export default defaultMenuConfig;
