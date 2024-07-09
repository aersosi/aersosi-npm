import chalk, { Chalk } from 'chalk';

import type { IThemeColors } from 'config.d.themeColors.ts';
import type { TitleAsciiShades } from 'config.d.themeColors.ts';

export const shades: TitleAsciiShades = {
  _1: '#ffffff',
  _2: '#cccccc',
  _3: '#999999',
  _4: '#666666',
  _5: '#333333',
};

const shadesChalk: Record<string, Chalk> = {};
Object.entries(shades).forEach(([key, value]) => {
  shadesChalk['shade' + key] = chalk.hex(value);
});
export const themeColors: IThemeColors = {
  white: chalk.whiteBright,
  ...shadesChalk,
};
