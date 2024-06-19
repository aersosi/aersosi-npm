import figlet from 'figlet';
import { cleanAsciiArtText, log, paddingColorRows } from './functions.helper.js';
import { themeBox } from '../default/default.themeBox.js';
import { CvStyles, BoxStyle, IPrint } from 'functions.d.print.js';
import { Chalk } from 'chalk';

export class Print implements IPrint {
  outlinesVertical: number = 2;
  length: number;
  boxColor: Chalk;
  textPaddingX: number;
  style: BoxStyle;
  titleAsciiShades: Record<string, string>;

  constructor(cvStyles: CvStyles) {
    this.length = cvStyles.maxCvWidth - this.outlinesVertical;
    this.boxColor = cvStyles.boxColor;
    this.textPaddingX = cvStyles.textPaddingX;
    this.style = themeBox[cvStyles.boxStyle];
    this.titleAsciiShades = cvStyles.titleAsciiShades;
  }

  top(): void {
    log(
      this.boxColor(
        `${this.style.topLeft}${this.style.horizontal.repeat(this.length)}${this.style.topRight}`,
      ),
    );
  }

  bottom(): void {
    log(
      this.boxColor(
        `${this.style.bottomLeft}${this.style.horizontal.repeat(this.length)}${this.style.bottomRight}`,
      ),
    );
  }

  divider(): void {
    log(
      this.boxColor(
        `${this.style.centerLeft}${this.style.horizontal.repeat(this.length)}${this.style.centerRight}`,
      ),
    );
  }

  empty(): void {
    log(this.boxColor(`${this.style.vertical}${' '.repeat(this.length)}${this.style.vertical}`));
  }

  text(string: string, bodyStyleBox: Chalk): string {
    const ellipsis = '...';
    let stringSanitized;

    if (string.length > this.length - this.textPaddingX * 2) {
      stringSanitized =
        string.slice(0, this.length - this.textPaddingX * 2 - ellipsis.length) + ellipsis;
    } else {
      stringSanitized = string.padEnd(this.length - this.textPaddingX * 2);
    }

    const rowContent =
      ' '.repeat(this.textPaddingX) + stringSanitized + ' '.repeat(this.textPaddingX);
    return `${this.boxColor(this.style.vertical)}${bodyStyleBox(rowContent)}${this.boxColor(this.style.vertical)}`;
  }

  titleAscii(string: string = 'test', titlePaddingX: number | null = null): void {
    const asciiArtText = figlet.textSync(string, {
      font: 'ANSI Regular',
      width: this.length,
      whitespaceBreak: true,
    });

    const cleanLines = cleanAsciiArtText(asciiArtText);

    const processedRows = paddingColorRows(
      cleanLines,
      titlePaddingX,
      this.length,
      this.outlinesVertical,
      this.titleAsciiShades,
    );

    log(`\n${processedRows}`);
  }

  pageExtraContent(content: string): void {
    log(content);
  }
}
