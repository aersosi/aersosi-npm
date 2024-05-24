import chalk from 'chalk';

export const shades = {
  1: '#ffffff',
  2: '#cccccc',
  3: '#999999',
  4: '#666666',
  5: '#333333',
  6: '',
};

const shadesChalk = {};
Object.entries(shades).forEach(([key, value]) => {
  shadesChalk['shade' + key] = chalk.hex(value);
});
export const themeColors = {
  white: chalk.whiteBright,
  ...shadesChalk,
};
