import chalk from 'chalk';
import { stdout } from 'process';

import type { ICVStyles, TPageConfig } from 'functions.d.helper.ts';
import type { TitleAsciiShades } from 'config.d.themeColors.ts';

// Reliable Console Escape Sequence. Clear the console
export const clearConsole = (): boolean => stdout.write('\x1Bc\x1B[3J');

// Shorthand for console.log
export const log = (value: string): void => console.log(value); // shorthand

// Import configuration with fallback to default
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

// Import extra page configuration
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

// Handle narrow console by checking width
export async function handleNarrowConsole(option: () => void, cvStyles: ICVStyles): Promise<void> {
  const consoleWidth = stdout.columns;

  if (consoleWidth < cvStyles.maxCvWidth) {
    await checkConsoleWidth(option, cvStyles);
  } else {
    await option();
  }
}

// Check console width and prompt user to increase if necessary
export async function checkConsoleWidth(option: () => void, cvStyles: ICVStyles): Promise<void> {
  const intervalCheckWidth = setInterval(() => {
    const newConsoleWidth = stdout.columns;

    clearConsole();
    if (newConsoleWidth < cvStyles.maxCvWidth) {
      log(chalk.red('Please increase the width of the terminal window.'));
    } else {
      clearInterval(intervalCheckWidth);
      setTimeout(option, 1000);
    }
  }, 250);
}

// Convert figlet string to 2D array
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

// Transform lines into a formatted structure
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

// Find the longest line in each sub-array
function findLongestLine(arr: string[][]): number[] {
  return arr.map(childArray => {
    if (!Array.isArray(childArray) || childArray.length === 0) {
      return 0;
    }
    const lineLengths = childArray.map(line => line.length);
    return Math.max(...lineLengths);
  });
}

// Clean and format ASCII art text
export function cleanAsciiArtText(asciiArtText: string): (string | Record<string, string[]>)[] {
  const lines = figletStringtoArray(asciiArtText);

  if (lines.length > 2) {
    log(chalk.red('Use shorter Title, only two rows allowed.'));
  }

  return transformLines(lines);
}

// Add padding and color to ASCII art rows
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
      let linePaddingX: number;

      if (titlePaddingX === null) {
        linePaddingX = Math.ceil((maxCvWidth + outlinesVertical - parseInt(key)) * 0.5);
      } else {
        linePaddingX = titlePaddingX;
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
