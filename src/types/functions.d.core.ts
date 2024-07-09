import { Chalk } from 'chalk';
import { Print } from '../core/functions.print';
import { IConfigCvContent } from 'config.d.cvContent.js';
import { IConfigICvStyles } from 'config.d.cvStyles.js';

export interface ICore {
  cvContent: IConfigCvContent;
  cvStyles: IConfigICvStyles;
  print: Print;
  titleAsciiText: string;
  titleAsciiPadding: number;
  subtitleAsciiText: string;
  subtitleAsciiColor: Chalk;
  pageExtraName: string | null;
  pageExtraContent: string | null;
}
