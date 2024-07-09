import chalk from 'chalk';
import { shades } from './config.themeColors.js';
import { themeColors } from './config.themeColors.js';

import type { IConfigICvStyles } from 'config.d.cvStyles.ts';

export const configICvStyles: IConfigICvStyles = {
  maxCvWidth: 88,
  textPaddingX: 4,
  boxColor: chalk.whiteBright,
  boxStyle: 'rounded',
  titleAsciiShades: shades,
  titleStyleBox: themeColors.shade_3.bold,
  subTitleStyleBox: themeColors.white,
  bodyStyleBox: themeColors.white.italic,
};
