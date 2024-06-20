import chalk, { Chalk } from 'chalk';
import { IThemeColors } from 'config.d.themeColors.js';
import { TitleAsciiShades } from 'config.d.themeColors.js';

export const shades: TitleAsciiShades = {
  1: '#ffff33',
  2: '#ffbf00',
  3: '#ff9500',
  4: '#ff6a00',
  5: '#ff4000',
};

const shadesChalk: Record<string, Chalk> = {};
Object.entries(shades).forEach(([key, value]) => {
  shadesChalk['shade' + key] = chalk.hex(value);
});
export const themeColors: IThemeColors = {
  white: chalk.whiteBright,
  ...shadesChalk,
};
