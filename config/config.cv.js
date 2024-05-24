import {colorsTheme} from './config.colors.js';
import {orangeGradient} from "./config.colors.js";

// export const cvStyles = {
//     // maxCvWidth: 88,
//     // titleAsciiShades: orangeGradient,
//     // titleStyle: colorsTheme.shade5.bold,
//     // subTitleStyle: colorsTheme.white,
//     // bodyStyle: colorsTheme.white.italic,
// };


// config.cv.js
import chalk from 'chalk';

export const customCvStyles = {
    maxCvWidth: 88,
    textPaddingX: 4,
    outlineColor: chalk.whiteBright,
    textColor: chalk.whiteBright,
    outlineStyle: 'rounded',
    titleAsciiShades: orangeGradient,
    titleStyle: colorsTheme.shade5.bold,
    subTitleStyle: colorsTheme.white,
    bodyStyle: colorsTheme.white.italic,
};


export const cvContent = {
    // lorem: 'Ipsum',
};