import { Chalk } from 'chalk';
import { TitleAsciiShades } from 'config.d.themeColors.js';

export interface ICvStyles {
  maxCvWidth: number;
  boxColor: Chalk;
  textPaddingX: number;
  boxStyle: string;
  titleAsciiShades: TitleAsciiShades;
}

export interface IBoxStyle {
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

export interface IBoxTheme {
  [key: string]: IBoxStyle;
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
