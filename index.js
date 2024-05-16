#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import stripAnsi from 'strip-ansi';
import fs from 'fs';
import path from 'path';
import { PrintFunctions } from './helpers/print-functions.js';

const resumePath = path.resolve('./data/resume.json');
const resume = JSON.parse(fs.readFileSync(resumePath, 'utf8'));

const orangeColors = {
    1: '#ffff33',
    2: '#ffbf00',
    3: '#ff9500',
    4: '#ff6a00',
    5: '#ff4000'
};

const orangeChalk = {};
Object.entries(orangeColors).forEach(([key, value]) => {
    orangeChalk['orange'+key] = chalk.hex(value);
});
const colorsChalk = {
    white: chalk.whiteBright,
    ...orangeChalk
};

const print = new PrintFunctions(88, 4, colorsChalk.white, 'rounded' , orangeColors);

const manuIndexOptions = {
    type: 'list',
    name: 'resumeOptions',
    message: 'What do you want to know about me?',
    choices: [
        'Face',
        ...Object.keys(resume),
        colorsChalk.orange5('Exit')],
    loop: 'false'
}

const manuBackExitOptions = {
    type: 'list',
    prefix: '',
    name: 'menuBack',
    message: 'Go back or Exit?',
    choices: [
        'Back',
        colorsChalk.orange5('Exit')],
    loop: 'false'
}


function menuBackExit() {
    console.log(''); // empty line

    inquirer
        .prompt(manuBackExitOptions)
        .then(choice => {
            const cleanOption = stripAnsi(choice.menuBack);

            if (cleanOption === 'Back') {
                console.clear();
                menuIndex();
            } else {
                console.clear();
            }
        });
}

function menuIndex() {
    console.clear();

    print.TitleASCII('Index',2)
    console.log(colorsChalk.orange5('  Hello, my name is Arthur Ersosi. Welcome to my resume!'));
    console.log('') // empty line

    inquirer.prompt(manuIndexOptions).then(answer => {
        const cleanOption = stripAnsi(answer.resumeOptions);

        if (cleanOption === 'Face') {
            console.clear();

            print.TitleASCII('Face')
            print.FaceASCII();

            menuBackExit();
            return;
        }

        if (cleanOption === 'Exit') {
            console.clear();
            return;
        }
        console.clear();

        showResumePage(cleanOption);
        menuBackExit();
    });

}

function showResumePage(option) {
    if (!resume.hasOwnProperty(option)) {
        console.error('Error: Missing or invalid data for ' + option);
        return;
    }

    const data = resume[option];

    print.TitleASCII(option)
    print.Top();
    print.Empty();

    data.forEach((info, index) => {

        const formattingFunctions = {
            emptyLine: () => print.Empty(),
            title: value => console.log(print.Text(`${value.toUpperCase()}`, colorsChalk.orange5.bold)),
            subtitle: value => console.log(print.Text(`${value}`, colorsChalk.white)),
            body: value => console.log(print.Text(`${value}`, colorsChalk.white.italic)),
        };

        Object.entries(info).forEach(([key, value]) => {
            const formatFunction = formattingFunctions[key] || formattingFunctions.body;
            formatFunction(value);
        });

        if (index !== data.length - 1) {
            print.Empty();
            print.Divider();
            print.Empty();
        }

    });

    print.Empty();
    print.Bottom();
}

(() => {
    console.clear();
    menuIndex();
})();
