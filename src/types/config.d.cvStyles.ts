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
