import { defaultCvContent } from './default.cvContent.js';
import chalk from "chalk";

let configCvContent = {};
try {
    configCvContent = (await import("../config/config.cvContent.js")).configCvContent;
} catch (e) {
    console.log("Custom CV content not found, using default content.");
}

const cvContent = Object.keys(configCvContent).length > 0 ? configCvContent : defaultCvContent;

export const menuIndexOptions = {
    type: 'list',
    name: 'resumeOptions',
    message: 'What do you want to know about me?',
    choices: [
        ...Object.keys(cvContent),
        'Exit'
    ],
};

export const menuBackExitOptions = {
    type: 'list',
    name: 'menuBack',
    message: 'Go back or Exit?',
    choices: [
        'Back',
        'Exit'
    ],
};

export const titleAsciiText = 'Index';
export const titleAsciiPadding = null;

export const subtitleAsciiText = 'Welcome to my resume!';
export const subtitleAsciiColor = chalk.red;

const defaultMenuConfig = {
    menuIndexOptions,
    menuBackExitOptions,
    titleAsciiText,
    titleAsciiPadding,
    subtitleAsciiText,
    subtitleAsciiColor
};

export default defaultMenuConfig;