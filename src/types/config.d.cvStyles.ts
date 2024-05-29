import { Chalk } from 'chalk';
export interface ConfigCvStyles {
  maxCvWidth: number;
  textPaddingX: number;
  boxColor: Chalk;
  boxStyle: string;
  titleAsciiShades: Record<string, string>;
  titleStyleBox: Chalk;
  subTitleStyleBox: Chalk;
  bodyStyleBox: Chalk;
}

export interface ConfigCvContent {
  [key: string]: any;
}

export interface MenuConfig {
  titleAsciiText: string;
  titleAsciiPadding: number;
  subtitleAsciiText: string;
  subtitleAsciiColor: Chalk;
  menuIndexOptions: any[];
  menuBackExitOptions: any[];
}

export interface PageExtraConfig {
  name: string;
  content: string;
}
