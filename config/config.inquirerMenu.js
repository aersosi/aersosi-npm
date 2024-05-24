import { themeColors } from './config.themeColors.js';
import { additionalSectionEnable, additionalSectionName } from "./config.additionalSection.js";
import { defaultCvContent } from '../core/default.CvContent.js';

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
        ...(additionalSectionEnable ? [additionalSectionName] : []),
        ...Object.keys(cvContent),
        themeColors.shade5('Exit')
    ],
    loop: false
};

export const menuBackExitOptions = {
    type: 'list',
    prefix: '',
    name: 'menuBack',
    message: 'Go back or Exit?',
    choices: [
        'Back',
        themeColors.shade5('Exit')
    ],
    loop: false
};
