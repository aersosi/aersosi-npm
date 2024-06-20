import { themeColors } from './config.themeColors.js';
import { shades } from './config.themeColors.js';
import chalk from 'chalk';

import { IConfigICvStyles } from 'config.d.cvStyles.js';

export const configICvStyles: IConfigICvStyles = {
  maxCvWidth: 88,
  textPaddingX: 4,
  boxColor: chalk.whiteBright,
  boxStyle: 'rounded',
  titleAsciiShades: shades,
  titleStyleBox: themeColors.shade3.bold,
  subTitleStyleBox: themeColors.white,
  bodyStyleBox: themeColors.white.italic,
};
