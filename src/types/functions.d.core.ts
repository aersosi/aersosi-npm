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

interface CvContent {
  [key: string]: Array<{
    title?: string;
    subtitle?: string;
    emptyLine?: string;
    body?: string;
  }>;
}

type CvStyles = typeof defaultCvStyles;
