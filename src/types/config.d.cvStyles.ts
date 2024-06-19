import { Chalk } from 'chalk';
import { CvStyles } from 'functions.d.print.js';

export interface ConfigCvStyles extends CvStyles {
  titleStyleBox: Chalk;
  subTitleStyleBox: Chalk;
  bodyStyleBox: Chalk;
}
