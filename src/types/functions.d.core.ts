import { Chalk } from 'chalk';
import { Print } from '../core/functions.print';
import { defaultCvStyles } from '../default/default.cvStyles.js';

export interface ICore {
  cvContent: CvContent;
  cvStyles: CvStyles;
  print: Print;
  titleAsciiText: string;
  titleAsciiPadding: number;
  subtitleAsciiText: string;
  subtitleAsciiColor: Chalk;
  pageExtraName: string | null;
  pageExtraContent: string | null;
}

type CvContent = Record<
  string,
  Array<{
    title?: string;
    subtitle?: string;
    emptyLine?: string;
    body?: string;
    [key: string]: string | undefined;
  }>
>;

type CvStyles = typeof defaultCvStyles;
