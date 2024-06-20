import chalk from 'chalk';
import { ICVStyles, TPageConfig } from 'functions.d.helper.js';
import { TitleAsciiShades } from 'config.d.themeColors.js';

export const clearConsole = (): boolean => process.stdout.write('\x1Bc'); // Reliable Console Escape Sequence
export const log = (value: string): void => console.log(value); // shorthand
export async function importConfig<T>(
  defaultModule: T,
  modulePath: string,
  errorMessage: string,
): Promise<T> {
  try {
    const module: { [key: string]: never } = await import(modulePath);
    return module[Object.keys(module)[0]] as T; // Assumes default export
  } catch {
    console.error(errorMessage);
    return defaultModule;
  }
}

export async function importExtraPageConfig(): Promise<TPageConfig> {
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

export async function handleNarrowConsole(option: () => void, cvStyles: ICVStyles): Promise<void> {
  const consoleWidth = process.stdout.columns;

  if (consoleWidth < cvStyles.maxCvWidth) {
    await checkConsoleWidth(option, cvStyles);
  } else {
    await option();
  }
}

export async function checkConsoleWidth(option: () => void, cvStyles: ICVStyles): Promise<void> {
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

function figletStringtoArray(figletString: string): string[][] {
  return figletString
    .split('\n')
    .reduce((acc: string[][], line: string) => {
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

function transformLines(lines: string[][]): (string | Record<string, string[]>)[] {
  let newLines: (string | Record<string, string[]>)[];

  if (lines.length > 1) {
    newLines = [
      { [findLongestLine([lines[0]])[0]]: lines[0] },
      '',
      { [findLongestLine([lines[1]])[0]]: lines[1] },
      '',
    ];
  } else {
    newLines = [{ [findLongestLine([lines[0]])[0]]: lines[0] }, ''];
  }

  return newLines;
}

function findLongestLine(arr: string[][]): number[] {
  return arr.map(childArray => {
    if (!Array.isArray(childArray) || childArray.length === 0) {
      return 0;
    }
    const lineLengths = childArray.map(line => line.length);
    return Math.max(...lineLengths);
  });
}

export function cleanAsciiArtText(asciiArtText: string): (string | Record<string, string[]>)[] {
  const lines = figletStringtoArray(asciiArtText);

  if (lines.length > 2) {
    log(chalk.red('Use shorter Title, only two rows allowed.'));
  }

  return transformLines(lines);
}

export function paddingColorRows(
  cleanLines: (string | Record<string, string[]>)[],
  titlePaddingX: number | null = null,
  maxCvWidth: number,
  outlinesVertical: number,
  titleAsciiShades: TitleAsciiShades,
): string {
  return cleanLines
    .map(obj => {
      if (typeof obj === 'string') {
        return obj;
      }

      const key = Object.keys(obj)[0] as string;
      const lines = (obj as { [key: string]: string[] })[key];
      let linePaddingX = titlePaddingX;

      if (linePaddingX === null) {
        linePaddingX = Math.ceil((maxCvWidth + outlinesVertical - parseInt(key)) * 0.5);
      }

      const colors = Object.values(titleAsciiShades);

      return lines
        .map((line: string, lineIndex: number) => {
          const colorIndex = lineIndex % colors.length;
          const color = colors[colorIndex];
          const paddedLine = `${' '.repeat(linePaddingX)}${line}`;
          return chalk.hex(color)(paddedLine);
        })
        .join('\n');
    })
    .join('\n');
}
