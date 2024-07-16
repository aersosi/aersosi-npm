import { Chalk } from 'chalk';
import figlet from 'figlet';
import { cleanAsciiArtText, log, paddingColorRows } from './functions.helper.js';
import { themeBox } from '../default/default.themeBox.js';

import type { ICvStyles, IBoxStyle, IPrint } from 'functions.d.print.ts';
import type { TitleAsciiShades } from 'config.d.themeColors.ts';

export class Print implements IPrint {
  outlinesVertical: number = 2;
  length: number;
  boxColor: Chalk;
  textPaddingX: number;
  style: IBoxStyle;
  titleAsciiShades: TitleAsciiShades;

  // Initialize properties
  constructor(cvStyles: ICvStyles) {
    this.length = cvStyles.maxCvWidth - this.outlinesVertical;
    this.boxColor = cvStyles.boxColor;
    this.textPaddingX = cvStyles.textPaddingX;
    this.style = themeBox[cvStyles.boxStyle];
    this.titleAsciiShades = cvStyles.titleAsciiShades;
  }

  // Method to print the top border of the box
  top(): void {
    log(
      this.boxColor(
        `${this.style.topLeft}${this.style.horizontal.repeat(this.length)}${this.style.topRight}`,
      ),
    );
  }

  // Method to print the bottom border of the box
  bottom(): void {
    log(
      this.boxColor(
        `${this.style.bottomLeft}${this.style.horizontal.repeat(this.length)}${this.style.bottomRight}`,
      ),
    );
  }

  // Method to print a divider line within the box
  divider(): void {
    log(
      this.boxColor(
        `${this.style.centerLeft}${this.style.horizontal.repeat(this.length)}${this.style.centerRight}`,
      ),
    );
  }

  // Method to print an empty line within the box
  empty(): void {
    log(this.boxColor(`${this.style.vertical}${' '.repeat(this.length)}${this.style.vertical}`));
  }

  // Method to format and print text within the box
  text(string: string, bodyStyleBox: Chalk): string {
    const ellipsis = '...';
    let stringSanitized;

    // Truncate the string and add ellipsis at the end if it's too long
    if (string.length > this.length - this.textPaddingX * 2) {
      stringSanitized =
        string.slice(0, this.length - this.textPaddingX * 2 - ellipsis.length) + ellipsis;
    } else {
      stringSanitized = string.padEnd(this.length - this.textPaddingX * 2);
    }

    // Add padding and format the text
    const rowContent =
      ' '.repeat(this.textPaddingX) + stringSanitized + ' '.repeat(this.textPaddingX);
    return `${this.boxColor(this.style.vertical)}${bodyStyleBox(rowContent)}${this.boxColor(this.style.vertical)}`;
  }

  // Method to create and print ASCII art title
  titleAscii(string: string = 'test', titlePaddingX: number | null = null): void {
    const asciiArtText = figlet.textSync(string, {
      font: 'ANSI Regular',
      width: this.length,
      whitespaceBreak: true,
    });

    // Clean and process the ASCII art text
    const cleanLines = cleanAsciiArtText(asciiArtText);
    const processedRows = paddingColorRows(
      cleanLines,
      titlePaddingX,
      this.length,
      this.outlinesVertical,
      this.titleAsciiShades,
    );

    // Print the processed ASCII art
    log(`\n${processedRows}`);
  }

  // Method to print the content on the extra page
  pageExtraContent(content: string): void {
    log(content);
  }
}
