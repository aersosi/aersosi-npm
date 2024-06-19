import chalk from 'chalk';

export const clearConsole = () => process.stdout.write('\x1Bc'); // Reliable Console Escape Sequence
export const log = value => console.log(value); // shorthand
export async function importConfig(defaultModule, modulePath, errorMessage) {
  try {
    const module = await import(modulePath);
    return module[Object.keys(module)[0]]; // Assumes default export
  } catch {
    log(errorMessage);
    return defaultModule;
  }
}
export async function importExtraPageConfig() {
  try {
    const pageExtraModule = await import('../config/config.pageExtra.js');
    return {
      name: pageExtraModule.pageExtraName,
      content: pageExtraModule.pageExtraContent,
    };
  } catch {
    log('Extra page config not found.');
    return null;
  }
}
export async function handleNarrowConsole(option, cvStyles) {
  const consoleWidth = process.stdout.columns;

  if (consoleWidth < cvStyles.maxCvWidth) {
    await checkConsoleWidth(option, cvStyles);
  } else {
    await option();
  }
}
export async function checkConsoleWidth(option, cvStyles) {
  const intervalCheckWidth = setInterval(() => {
    const newConsoleWidth = process.stdout.columns;

    clearConsole();
    if (newConsoleWidth < cvStyles.maxCvWidth) {
      log(chalk.red('Please increase the width of the terminal window.'));
    } else {
      clearInterval(intervalCheckWidth);
      setTimeout(option, 1000);
    }
  }, 250);
}
function figletStringtoArray(figletString) {
  return figletString
    .split('\n')
    .reduce((acc, line) => {
      if (line.trim() === '') {
        if (acc.length === 0 || acc[acc.length - 1].length !== 0) {
          acc.push([]);
        }
      } else {
        if (acc.length === 0) {
          acc.push([]);
        }
        acc[acc.length - 1].push(line.trimEnd());
      }
      return acc;
    }, [])
    .filter(group => group.length > 0);
}
function transformLines(lines) {
  let newLines;

  if (lines.length > 1) {
    newLines = [
      { [findLongestLine([lines[0]])[0]]: lines[0] },
      [],
      { [findLongestLine([lines[1]])[0]]: lines[1] },
      [],
    ];
  } else {
    newLines = [{ [findLongestLine([lines[0]])[0]]: lines[0] }, []];
  }

  return newLines;
}
function findLongestLine(arr) {
  return arr.map(childArray => {
    if (!Array.isArray(childArray) || childArray.length === 0) {
      return 0;
    }
    const lineLengths = childArray.map(line => line.length);
    return Math.max(...lineLengths);
  });
}
export function cleanAsciiArtText(asciiArtText) {
  let lines = figletStringtoArray(asciiArtText);

  if (lines.length > 2) {
    log(chalk.red('Use shorter Title, only two rows allowed.'));
  }

  return transformLines(lines);
}
export function paddingColorRows(
  cleanLines,
  titlePaddingX = null,
  maxCvWidth,
  outlinesVertical,
  titleAsciiShades,
) {
  return cleanLines
    .map(obj => {
      if (Array.isArray(obj) && obj.length === 0) {
        return '';
      }
      const key = Object.keys(obj)[0];

      const lines = obj[key];
      let linePaddingX = titlePaddingX;

      if (linePaddingX === null) {
        linePaddingX = Math.ceil((maxCvWidth + outlinesVertical - key) * 0.5);
      }

      const colors = Object.values(titleAsciiShades);

      return lines
        .map((line, lineIndex) => {
          const colorIndex = lineIndex % colors.length;
          const color = colors[colorIndex];
          const paddedLine = `${' '.repeat(linePaddingX)}${line}`;
          return chalk.hex(color)(paddedLine);
        })
        .join('\n');
    })
    .join('\n');
}
