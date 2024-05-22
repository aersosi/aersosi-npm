import inquirer from "inquirer";
import stripAnsi from "strip-ansi";
import path from "path";
import fs from "fs";

import {Print} from "./functions.print.js";
import {colorsChalk, orangeColors} from "./config.colors.js";
import {manuBackExitOptions, manuIndexOptions} from "./config.menu.js";
import chalk from "chalk";

const resumePath = path.resolve('./data/data.resume.json');
const resume = JSON.parse(fs.readFileSync(resumePath, 'utf8'));

const clearConsole = () => process.stdout.write('\x1Bc'); // Reliable Clear Console Escape Sequence

export class CV {
    constructor() {
        this.print = new Print(88, 4, chalk.whiteBright, 'rounded', orangeColors);
        this.resume = resume;
    }

    async handleNarrowConsole() {
        const consoleWidth = process.stdout.columns;

        if (consoleWidth < 88) {
            await this.checkConsoleWidth();
        } else {
            await this.menuIndex();
        }
    }

    async checkConsoleWidth() {

        const intervalCheckWidth = setInterval(() => {
            const newConsoleWidth = process.stdout.columns;

            clearConsole();
            if (newConsoleWidth < 88) {
                console.log(chalk.red('Please increase width of terminal window.'));
            } else {
                console.log(chalk.green('Thank you. Continuing now with the CV. :)'));
                clearInterval(intervalCheckWidth);

                setTimeout(() => {
                    this.menuIndex();
                }, 2000);
            }
        }, 200);
    }


    async menuIndex() {
        clearConsole();

        this.print.titleASCII('Index', 2);
        console.log(colorsChalk.orange5('  Hello, my name is Arthur Ersosi. Welcome to my resume!'));
        console.log(''); // empty line

        process.stdin.setMaxListeners(20);

        try {
            const answer = await inquirer.prompt(manuIndexOptions);
            const cleanOption = stripAnsi(answer.resumeOptions);

            if (cleanOption === 'About Me') {
                clearConsole();
                this.print.titleASCII('About Me');
                this.print.faceASCII();

                await this.menuBackExit();
            } else if (cleanOption === 'Exit') {
                clearConsole();
            } else {
                clearConsole();
                await this.showResumePage(cleanOption);
                await this.menuBackExit();
            }
        } catch (error) {
            console.error('Error in menuIndex:', error);
        }
    }

    async menuBackExit() {
        console.log(''); // empty line

        try {
            const choice = await inquirer.prompt(manuBackExitOptions);
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

    async showResumePage(option) {
        if (!this.resume.hasOwnProperty(option)) {
            console.error('Error: Missing or invalid data for ' + option);
            return;
        }

        const data = this.resume[option];

        this.print.titleASCII(option);
        this.print.top();
        this.print.empty();

        data.forEach((info, index) => {
            const formattingFunctions = {
                emptyLine: () => this.print.empty(),
                title: value => console.log(this.print.text(`${value.toUpperCase()}`, colorsChalk.orange5.bold)),
                subtitle: value => console.log(this.print.text(`${value}`, colorsChalk.white)),
                body: value => console.log(this.print.text(`${value}`, colorsChalk.white.italic)),
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
