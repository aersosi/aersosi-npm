import inquirer from "inquirer";
import stripAnsi from "strip-ansi";
import chalk from "chalk";
import path from "path";
import fs from "fs";

import {Print} from "./functions.print.js";
import {clearConsole, log} from "./functions.helper.js";
import {colorsTheme} from "../config/config.colors.js";
import {menuBackExitOptions, menuIndexOptions} from "../config/config.menu.js";
import {additionalSectionEnable, additionalSectionName} from "../config/config.additionalSection.js";

const resumePath = path.resolve('./data/data.resume.json');
const resume = JSON.parse(fs.readFileSync(resumePath, 'utf8'));

const defaultCvStyles = {
    maxCvWidth: 80,
    textPaddingX: 4,
    outlineColor: chalk.whiteBright,
    textColor: chalk.whiteBright,
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

let customCvStyles;
try {
    customCvStyles = (await import("../config/config.cv.js")).customCvStyles;
} catch (e) {
    customCvStyles = {};
}

export class Core {
    constructor() {
        this.cvStyles = { ...defaultCvStyles, ...customCvStyles };
        this.colorsTheme = colorsTheme;
        this.print = new Print(this.cvStyles);
        this.resume = resume;
    }

    async handleNarrowConsole(option = this.menuIndex.bind(this)) {
        const consoleWidth = process.stdout.columns;

        if (consoleWidth < this.cvStyles.maxCvWidth) {
            await this.checkConsoleWidth(option);
        } else {
            await option();
        }
    }

    async checkConsoleWidth(option) {
        const intervalCheckWidth = setInterval(() => {
            const newConsoleWidth = process.stdout.columns;

            clearConsole();
            if (newConsoleWidth < this.cvStyles.maxCvWidth) {
                log(chalk.red('Please increase the width of the terminal window.'));
            } else {
                log(chalk.green('Thank you. Continuing now with the CV. :)'));
                clearInterval(intervalCheckWidth);

                setTimeout(() => {
                    option();
                }, 2000);
            }
        }, 200);
    }

    async menuIndex() {
        clearConsole();

        this.print.titleAscii('Index', 2);
        log(this.colorsTheme.shade5('  Hello, my name is Arthur Ersosi. Welcome to my resume!'));
        log(''); // empty row

        process.stdin.setMaxListeners(20);

        try {
            const choice = await inquirer.prompt(menuIndexOptions);
            const cleanOption = stripAnsi(choice.resumeOptions);

            if (additionalSectionEnable && cleanOption === additionalSectionName) {
                clearConsole();
                this.print.titleAscii(additionalSectionName);
                this.print.additionalSectionContent();

                await this.menuBackExit();
            } else if (cleanOption === 'Exit') {
                clearConsole();
            } else {
                clearConsole();
                await this.showCvPage(cleanOption);
                await this.menuBackExit();
            }
        } catch (error) {
            console.error('Error in menuIndex:', error);
        }
    }

    async menuBackExit() {
        log(''); // empty row

        try {
            const choice = await inquirer.prompt(menuBackExitOptions);
            const cleanOption = stripAnsi(choice.menuBack);

            if (cleanOption === 'Back') {
                clearConsole();
                await this.menuIndex();
            } else {
                clearConsole();
            }
        } catch (error) {
            console.error('Error in menuBackExit:', error);
        }
    }

    async showCvPage(option) {
        await this.handleNarrowConsole(this.showCvPageContent.bind(this, option));
    }

    async showCvPageContent(option) {
        if (!this.resume.hasOwnProperty(option)) {
            console.error('Error: Missing or invalid data for ' + option);
            return;
        }

        const data = this.resume[option];

        this.print.titleAscii(option);
        this.print.top();
        this.print.empty();

        data.forEach((info, index) => {
            const formattingFunctions = {
                emptyLine: () => this.print.empty(),
                title: value => log(this.print.text(`${value.toUpperCase()}`, this.cvStyles.titleStyle)),
                subtitle: value => log(this.print.text(`${value}`, this.cvStyles.subTitleStyle)),
                body: value => log(this.print.text(`${value}`, this.cvStyles.bodyStyle)),
            };

            Object.entries(info).forEach(([key, value]) => {
                const formatFunction = formattingFunctions[key] || formattingFunctions.body;
                formatFunction(value);
            });

            if (index !== data.length - 1) {
                this.print.empty();
                this.print.divider();
                this.print.empty();
            }
        });

        this.print.empty();
        this.print.bottom();
    }
}
