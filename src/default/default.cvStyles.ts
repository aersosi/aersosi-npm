import { shades, themeColors } from './default.themeColors.js';
import { ConfigCvStyles } from 'config.d.cvStyles.js';

export const defaultCvStyles: ConfigCvStyles = {
  maxCvWidth: 80,
  textPaddingX: 4,
  boxColor: themeColors.white,
  boxStyle: 'rounded',
  titleAsciiShades: shades,
  titleStyleBox: themeColors.white.bold,
  subTitleStyleBox: themeColors.white,
  bodyStyleBox: themeColors.white.italic,
};
