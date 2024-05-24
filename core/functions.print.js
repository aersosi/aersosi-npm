import chalk from "chalk";
import figlet from "figlet";
import { log } from "./functions.helper.js";
import { themeOutline } from "../private/default.themeOutline.js";
export class Print {
  outlinesVertical = 2;

  constructor(cvStyles) {
    this.length = cvStyles.maxCvWidth - this.outlinesVertical;
    this.outlineColor = cvStyles.outlineColor;
    this.textPaddingX = cvStyles.textPaddingX;
    this.style = themeOutline[cvStyles.outlineStyle];
    this.titleAsciiShades = cvStyles.titleAsciiShades;
  }

  top() {
    log(
      this.outlineColor(
        `${this.style.topLeft}${this.style.horizontal.repeat(this.length)}${this.style.topRight}`,
      ),
    );
  }

  bottom() {
    log(
      this.outlineColor(
        `${this.style.bottomLeft}${this.style.horizontal.repeat(this.length)}${this.style.bottomRight}`,
      ),
    );
  }

  divider() {
    log(
      this.outlineColor(
        `${this.style.centerLeft}${this.style.horizontal.repeat(this.length)}${this.style.centerRight}`,
      ),
    );
  }

  empty() {
    log(
      this.outlineColor(
        `${this.style.vertical}${" ".repeat(this.length)}${this.style.vertical}`,
      ),
    );
  }

  text(string, bodyStyle) {
    const ellipsis = "...";
    let stringSanitized;

    if (string.length > this.length - this.textPaddingX * 2) {
      stringSanitized =
        string.slice(0, this.length - this.textPaddingX * 2 - ellipsis.length) +
        ellipsis;
    } else {
      stringSanitized = string.padEnd(this.length - this.textPaddingX * 2);
    }

    const rowContent =
      " ".repeat(this.textPaddingX) +
      stringSanitized +
      " ".repeat(this.textPaddingX);
    return `${this.outlineColor(this.style.vertical)}${bodyStyle(rowContent)}${this.outlineColor(this.style.vertical)}`;
  }

  titleAscii(string = "test", textPaddingX = null) {
    const asciiArtText = figlet.textSync(string, {
      font: "ANSI Regular",
      width: this.length,
      whitespaceBreak: true,
    });

    let lines = asciiArtText.split("\n").filter((line, index, arr) => {
      return index === arr.length - 1 ? line.trim() !== "" : true;
    });

    if (textPaddingX === null) {
      const maxLength = lines.reduce(
        (max, line) => Math.max(max, line.length),
        1,
      );
      textPaddingX = Math.ceil(
        (this.length + this.outlinesVertical - maxLength) * 0.5,
      );
    }

    const colorValues = Object.values(this.titleAsciiShades);
    const repeatedColors = [...colorValues, ...colorValues.reverse()];

    const coloredLines = lines.map((line, index) => {
      const color = repeatedColors[index % repeatedColors.length];
      return chalk.hex(color)(`${" ".repeat(textPaddingX)}${line}`);
    });

    log(`\n${coloredLines.join("\n")}`);
  }

  extraSectionContent(content) {
    log(content);
  }
}
