import chalk from "chalk";

export const defaultCvStyles = {
    maxCvWidth: 80,
    textPaddingX: 4,
    outlineColor: chalk.whiteBright,
    outlineStyle: 'rounded',
    titleAsciiShades: {
        1: '#ffffff',
        2: '#cccccc',
        3: '#999999',
        4: '#666666',
        5: '#333333',
        6: '',
    },
    titleStyle: chalk.whiteBright.bold,
    subTitleStyle: chalk.whiteBright,
    bodyStyle: chalk.whiteBright.italic,
};