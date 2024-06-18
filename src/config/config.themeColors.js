import chalk from 'chalk';

export const shades = {
  1: '#ffff33',
  2: '#ffbf00',
  3: '#ff9500',
  4: '#ff6a00',
  5: '#ff4000',
};

const shadesChalk = {};
Object.entries(shades).forEach(([key, value]) => {
  shadesChalk['shade' + key] = chalk.hex(value);
});
export const themeColors = {
  white: chalk.whiteBright,
  ...shadesChalk,
};
