import { Chalk } from 'chalk';

export interface CvStyles {
  maxCvWidth: number;
  boxColor: Chalk;
  textPaddingX: number;
  boxStyle: string;
  titleAsciiShades: Record<string, string>;
}

export interface BoxStyle {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
  vertical: string;
  horizontal: string;
  centerLeft: string;
  centerRight: string;
  empty: string;
}

export interface BoxTheme {
  [key: string]: BoxStyle;
}

export interface IPrint {
  top(): void;
  bottom(): void;
  divider(): void;
  empty(): void;
  text(string: string, bodyStyleBox: Chalk): string;
  titleAscii(string?: string, titlePaddingX?: number | null): void;
  pageExtraContent(content: string): void;
}
