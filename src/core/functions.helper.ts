import chalk from 'chalk';
import {
  CheckConsoleWidthFunction,
  CleanAsciiArtTextFunction,
  ConsoleFunction,
  FigletStringToArrayFunction,
  FindLongestLineFunction,
  HandleNarrowConsoleFunction,
  ImportConfigFunction,
  TransformLinesFunction,
} from 'functions.d.helper.js';

export const clearConsole = () => process.stdout.write('\x1Bc'); // Reliable Console Escape Sequence
export const log: ConsoleFunction = (...values) => console.log(...values);
export const error: ConsoleFunction = (...values) => console.error(...values);

export const importConfig: ImportConfigFunction = async (
  defaultModule,
  modulePath,
  errorMessage,
) => {
  try {
    const module = await import(modulePath);
    return module.default || module;
  } catch (err) {
    error(errorMessage, err);
    return defaultModule;
  }
};

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

export const handleNarrowConsole: HandleNarrowConsoleFunction = async (option, cvStyles) => {
  const consoleWidth = process.stdout.columns;

  if (consoleWidth < cvStyles.maxCvWidth) {
    await checkConsoleWidth(option, cvStyles);
  } else {
    await option();
  }
};

export const checkConsoleWidth: CheckConsoleWidthFunction = async (option, cvStyles) => {
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
};

const figletStringToArray: FigletStringToArrayFunction = figletString => {
  return figletString
    .split('\n')
    .reduce<string[][]>((acc, line) => {
      const cleanLine = line.replace(/[\s\u200B]/g, ' ').trim();
      if (cleanLine.length > 0) {
        acc.push([cleanLine]);
      }
      return acc;
    }, [])
    .filter(group => group.length > 0);
};

const transformLines: TransformLinesFunction = lines => {
  return lines.reduce(
    (acc, line, index) => {
      if (index > 0) {
        acc.push({});
      }
      acc.push({ [findLongestLine([line])]: [line] });
      return acc;
    },
    [] as { [key: string]: string[] }[],
  );
};

const findLongestLine = (lines: string[]): string => {
  return lines.reduce((longest, line) => (line.length > longest.length ? line : longest), '');
};

export const cleanAsciiArtText: CleanAsciiArtTextFunction = asciiArtText => {
  const lines = asciiArtText.split('\n');
  return lines.map(line => ({ [line.length]: line.split('') }));
};

export function paddingColorRows(
  cleanLines: any[],
  titlePaddingX: number | null,
  maxCvWidth: number,
  outlinesVertical: number,
  titleAsciiShades: Record<string, string>,
): string {
  return cleanLines
    .map(obj => {
      if (Array.isArray(obj) && obj.length === 0) {
        return '';
      }
      const key = Object.keys(obj)[0];
      const lines = obj[key];
      let linePaddingX = titlePaddingX;
      if (linePaddingX === null) {
        linePaddingX = Math.ceil((maxCvWidth + outlinesVertical - parseInt(key, 10)) * 0.5);
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
