import chalk from "chalk";

export const orangeGradient = {
    1: '#ffff33',
    2: '#ffbf00',
    3: '#ff9500',
    4: '#ff6a00',
    5: '#ff4000',
    6: ''
};

const shadesChalk = {};
Object.entries(orangeGradient).forEach(([key, value]) => {
    shadesChalk['shade'+key] = chalk.hex(value);
});
export const colorsTheme = {
    white: chalk.whiteBright,
    ...shadesChalk
};