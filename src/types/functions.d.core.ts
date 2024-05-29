import { Chalk } from 'chalk';
import { Print } from '../core/functions.print';
import { ConfigCvStyles, ConfigCvContent } from './config.d.cvStyles.js';

export interface CvStyles extends ConfigCvStyles {
  titleStyleBox: Chalk;
  subTitleStyleBox: Chalk;
  bodyStyleBox: Chalk;
}

export interface Core {
  cvContent: ConfigCvContent;
  cvStyles: CvStyles;
  print: Print;
  titleAsciiText: string;
  titleAsciiPadding: number;
  subtitleAsciiText: string;
  subtitleAsciiColor: Chalk;
  pageExtraName: string | null;
  pageExtraContent: string | null;
}
