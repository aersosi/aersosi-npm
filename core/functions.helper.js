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
    const extraPageModule = await import('../config/config.extraPage.js');
    return {
      name: extraPageModule.extraPageName,
      content: extraPageModule.extraPageContent,
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

export function cleanAsciiArtText(asciiArtText) {
  // Clean asciiArtText and push to array
  let lines = asciiArtText
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

  if (lines.length > 2) {
    throw new Error('Use shorter Title, only two rows allowed');
  }

  function findMaxCharacterCount(arr) {
    return arr.map(childArray => {
      if (!Array.isArray(childArray) || childArray.length === 0) {
        return 0;
      }
      const lineLengths = childArray.map(line => line.length);
      return Math.max(...lineLengths);
    });
  }

  let newLines;

  if (lines.length > 1) {
    newLines = [
      { [findMaxCharacterCount([lines[0]])[0]]: lines[0] },
      [],
      { [findMaxCharacterCount([lines[1]])[0]]: lines[1] },
      [],
    ];
  } else {
    newLines = [{ [findMaxCharacterCount([lines[0]])[0]]: lines[0] }, []];
  }

  lines = newLines; // Assigning newLines to lines

  const maxLengths = findMaxCharacterCount(lines);

  function padLines(arr, lengths) {
    return arr.map((obj, index) => {
      if (Array.isArray(obj) && obj.length === 0) {
        return obj;
      }
      const key = Object.keys(obj)[0];
      const childArray = obj[key];
      return { [key]: childArray.map(line => line.padEnd(lengths[index], ' ')) };
    });
  }

  return padLines(lines, maxLengths);
}

export function paddedAndColoredRows(
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
