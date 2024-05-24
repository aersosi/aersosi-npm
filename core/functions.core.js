import inquirer from "inquirer";
import stripAnsi from "strip-ansi";
import chalk from "chalk";

import { Print } from "./functions.print.js";
import { clearConsole, log } from "./functions.helper.js";
import { themeColors } from "../config/config.themeColors.js";
import { menuBackExitOptions, menuIndexOptions } from "../config/config.inquirerMenu.js";
import { additionalSectionEnable, additionalSectionName } from "../config/config.additionalSection.js";

import { defaultCvContent } from './default.CvContent.js';
import { defaultCvStyles } from './default.CvStyles.js';

async function importConfig(modulePath, defaultModule, errorMessage) {
    try {
        const module = await import(modulePath);
        return module[Object.keys(module)[0]]; // Assumes default export
    } catch (e) {
        console.log(errorMessage);
        return defaultModule;
    }
}

const configCvStyles = await importConfig("../config/config.cvStyles.js", defaultCvStyles, "Custom CV styles not found, using default styles.");
const configCvContent = await importConfig("../config/config.cvContent.js", defaultCvContent, "Custom CV content not found, using default content.");

export class Core {
    constructor() {
        this.cvContent = { ...defaultCvContent, ...configCvContent };
        this.cvStyles = { ...defaultCvStyles, ...configCvStyles };
        this.themeColors = themeColors;
        this.print = new Print(this.cvStyles);

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
                clearInterval(intervalCheckWidth);
                setTimeout(option, 1000);
            }
        }, 250);
    }

    async menuIndex() {
        clearConsole();

        this.print.titleAscii('Index', 2);
        log(this.themeColors.shade5('  Hello, my name is Arthur Ersosi. Welcome to my resume!'));
        log(''); // empty row

        try {
            const { resumeOptions } = await inquirer.prompt(menuIndexOptions);
            const cleanOption = stripAnsi(resumeOptions);

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
            const { menuBack } = await inquirer.prompt(menuBackExitOptions);
            const cleanOption = stripAnsi(menuBack);

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
        if (!this.cvContent.hasOwnProperty(option)) {
            console.error('Error: Missing or invalid data for ' + option);
            return;
        }

        const data = this.cvContent[option];

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
