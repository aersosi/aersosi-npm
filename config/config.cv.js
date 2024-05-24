import {colorsTheme} from './config.colors.js';
import {orangeShades} from "./config.colors.js";

// config.cv.js
import chalk from 'chalk';

export const customCvStyles = {
    maxCvWidth: 88,
    textPaddingX: 4,
    outlineColor: chalk.whiteBright,
    textColor: chalk.whiteBright,
    outlineStyle: 'rounded',
    titleAsciiShades: orangeShades,
    titleStyle: colorsTheme.shade5.bold,
    subTitleStyle: colorsTheme.white,
    bodyStyle: colorsTheme.white.italic,
};


export const cvContent = {
    // lorem: 'Ipsum',
};