import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import figlet from 'figlet';

import {ASCIIart} from '../data/data.ASCIIart.js';

const outlineElementsPath = path.resolve('./core/config.outlines.json');
const outlineElements = JSON.parse(fs.readFileSync(outlineElementsPath, 'utf8'));

export class Print {
    constructor(
        boxWidth = 70,
        textPaddingX = 5,
        outlineColor = chalk.whiteBright,
        outlineStyle = 'rounded',
        gradient = {
            1: '#ffffff',
            2: '#cccccc',
            3: '#999999',
            4: '#666666',
            5: '#333333',
            6: '',
        }
    ) {
        this.length = boxWidth - 2;
        this.color = outlineColor;
        this.textPaddingX = textPaddingX;
        this.style = outlineElements[outlineStyle];
        this.gradient = gradient;
    }

    top() {
        console.log(this.color(
            `${this.style.topLeft}${this.style.horizontal.repeat(this.length)}${this.style.topRight}`
        ));
    }

    bottom() {
        console.log(this.color(
            `${this.style.bottomLeft}${this.style.horizontal.repeat(this.length)}${this.style.bottomRight}`
        ));
    }

    divider() {
        console.log(this.color(
            `${this.style.centerLeft}${this.style.horizontal.repeat(this.length)}${this.style.centerRight}`
        ));
    }

    empty() {
        console.log(this.color(
            `${this.style.vertical}${this.style.empty.repeat(this.length)}${this.style.vertical}`
        ));
    }

    text(string, textColor = this.color) {
        const ellipsis = '...';
        let stringSanitized;

        if (string.length > this.length - (this.textPaddingX * 2)) {
            stringSanitized = string.slice(0, this.length - (this.textPaddingX * 2) - ellipsis.length) + ellipsis;
        } else {
            stringSanitized = string.padEnd(this.length - (this.textPaddingX * 2));
        }

        const rowContent = ' '.repeat(this.textPaddingX) + stringSanitized + ' '.repeat(this.textPaddingX);
        return `${this.color(this.style.vertical)}${textColor(rowContent)}${this.color(this.style.vertical)}`;
    }

    titleASCII(string = 'test', textPaddingX = null) {
        const asciiArt = figlet.textSync(string, {
            font: 'ANSI Regular',
            width: this.length,
            whitespaceBreak: true,
        });

        let lines = asciiArt.split('\n').filter((line, index, arr) => {
            return index === arr.length - 1 ? line.trim() !== '' : true;
        });

        if (textPaddingX === null) {
            const outlinesVertical = 2;
            const maxLength = lines.reduce((max, line) => Math.max(max, line.length), 1);
            textPaddingX = Math.ceil(((this.length + outlinesVertical) - maxLength) * 0.5);
         }

        const colorValues = Object.values(this.gradient);
        const repeatedColors = [...colorValues, ...colorValues.reverse()];

        const coloredLines = lines.map((line, index) => {
            const color = repeatedColors[index % repeatedColors.length];
            return chalk.hex(color)(`${' '.repeat(textPaddingX)}${line}`);
        });

        console.log(`\n${coloredLines.join('\n')}`);
    }

    faceASCII() {
        console.log(ASCIIart);
    }
}


