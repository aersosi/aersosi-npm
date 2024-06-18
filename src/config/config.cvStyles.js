import { themeColors } from './config.themeColors.js';
import { orangeShades } from './config.themeColors.js';
import chalk from 'chalk';

export const configCvStyles = {
  maxCvWidth: 88,
  textPaddingX: 4,
  boxColor: chalk.whiteBright,
  boxStyle: 'rounded',
  titleAsciiShades: orangeShades,
  titleStyleBox: themeColors.shade3.bold,
  subTitleStyleBox: themeColors.white,
  bodyStyleBox: themeColors.white.italic,
};
