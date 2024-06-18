import figlet from 'figlet';
import { cleanAsciiArtText, log, paddingColorRows } from './functions.helper.js';
import { themeOutline } from '../default/default.themeOutline.js';
export class Print {
  outlinesVertical = 2;

  constructor(cvStyles) {
    this.length = cvStyles.maxCvWidth - this.outlinesVertical;
    this.boxColor = cvStyles.boxColor;
    this.textPaddingX = cvStyles.textPaddingX;
    this.style = themeOutline[cvStyles.outlineStyle];
    this.titleAsciiShades = cvStyles.titleAsciiShades;
  }

  top() {
    log(
      this.boxColor(
        `${this.style.topLeft}${this.style.horizontal.repeat(this.length)}${this.style.topRight}`,
      ),
    );
  }

  bottom() {
    log(
      this.boxColor(
        `${this.style.bottomLeft}${this.style.horizontal.repeat(this.length)}${this.style.bottomRight}`,
      ),
    );
  }

  divider() {
    log(
      this.boxColor(
        `${this.style.centerLeft}${this.style.horizontal.repeat(this.length)}${this.style.centerRight}`,
      ),
    );
  }

  empty() {
    log(this.boxColor(`${this.style.vertical}${' '.repeat(this.length)}${this.style.vertical}`));
  }

  text(string, bodyStyleBox) {
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

  titleAscii(string = 'test', titlePaddingX = null) {
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

  pageExtraContent(content) {
    log(content);
  }
}
