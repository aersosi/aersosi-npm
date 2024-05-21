import chalk from "chalk";

export const orangeColors = {
    1: '#ffff33',
    2: '#ffbf00',
    3: '#ff9500',
    4: '#ff6a00',
    5: '#ff4000',
    6: ''
};

const orangeChalk = {};
Object.entries(orangeColors).forEach(([key, value]) => {
    orangeChalk['orange'+key] = chalk.hex(value);
});
export const colorsChalk = {
    white: chalk.whiteBright,
    ...orangeChalk
};