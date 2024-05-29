export type ConsoleFunction = (...values: unknown[]) => void;

export type ImportConfigFunction = (
  defaultModule: any,
  modulePath: string,
  errorMessage: string,
) => Promise<any>;

export type HandleNarrowConsoleFunction = (option: any, cvStyles: any) => Promise<void>;
export type CheckConsoleWidthFunction = (option: any, cvStyles: any) => Promise<void>;
export type FigletStringToArrayFunction = (figletString: string) => string[][];
export type TransformLinesFunction = (lines: string[]) => { [key: string]: string[] }[];
export type FindLongestLineFunction = (arr: string[][]) => number;
export type CleanAsciiArtTextFunction = (asciiArtText: string) => { [key: string]: string[] }[];
