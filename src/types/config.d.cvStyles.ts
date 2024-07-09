import { Chalk } from 'chalk';
import { ICvStyles } from 'functions.d.print.js';

export interface IConfigICvStyles extends ICvStyles {
  titleStyleBox: Chalk;
  subTitleStyleBox: Chalk;
  bodyStyleBox: Chalk;
}
