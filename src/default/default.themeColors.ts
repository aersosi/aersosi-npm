import chalk, { Chalk } from 'chalk';
import { Shades, ThemeColors } from 'config.d.themeColors.js';

export const shades: Shades = {
  1: '#ffffff',
  2: '#cccccc',
  3: '#999999',
  4: '#666666',
  5: '#333333',
};

const shadesChalk: Record<string, Chalk> = {};
Object.entries(shades).forEach(([key, value]) => {
  shadesChalk['shade' + key] = chalk.hex(value);
});
export const themeColors: ThemeColors = {
  white: chalk.whiteBright,
  ...shadesChalk,
};
