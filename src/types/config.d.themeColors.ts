import { Chalk } from 'chalk';

export interface ThemeColors {
  white: Chalk;
  [key: string]: Chalk;
}

export interface Shades extends Record<string, string> {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
}
