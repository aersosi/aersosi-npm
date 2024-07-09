import chalk, { Chalk } from 'chalk';

import type { IThemeColors } from 'config.d.themeColors.ts';
import type { TitleAsciiShades } from 'config.d.themeColors.ts';

export const shades: TitleAsciiShades = {
  _1: '#ffff33',
  _2: '#ffbf00',
  _3: '#ff9500',
  _4: '#ff6a00',
  _5: '#ff4000',
};

const shadesChalk: Record<string, Chalk> = {};
Object.entries(shades).forEach(([key, value]) => {
  shadesChalk['shade' + key] = chalk.hex(value);
});
export const themeColors: IThemeColors = {
  white: chalk.whiteBright,
  ...shadesChalk,
};
