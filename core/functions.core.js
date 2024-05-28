import inquirer from 'inquirer';
import stripAnsi from 'strip-ansi';

import { Print } from './functions.print.js';
import {
  clearConsole,
  importConfig,
  log,
  importExtraPageConfig,
  handleNarrowConsole,
} from './functions.helper.js';

import { defaultCvContent } from '../private/default.cvContent.js';
import { defaultCvStyles } from '../private/default.cvStyles.js';
import defaultMenuConfig from '../private/default.inquirerMenu.js';

const configCvStyles = await importConfig(
  defaultCvStyles,
  '../config/config.cvStyles.js',
  'Custom CV styles not found, using default styles.',
);
const configCvContent = await importConfig(
  defaultCvContent,
  '../config/config.cvContent.js',
  'Custom CV content not found, using default content.',
);
const menuConfig = await importConfig(
  defaultMenuConfig,
  '../config/config.inquirerMenu.js',
  'Custom menu config not found, using default config.',
);
const pageExtraConfig = await importExtraPageConfig();

export class Core {
  constructor() {
    this.cvContent = { ...defaultCvContent, ...configCvContent };
    this.cvStyles = { ...defaultCvStyles, ...configCvStyles };
    this.print = new Print(this.cvStyles);
    this.titleAsciiText = menuConfig.titleAsciiText;
    this.titleAsciiPadding = menuConfig.titleAsciiPadding;
    this.subtitleAsciiText = menuConfig.subtitleAsciiText;
    this.subtitleAsciiColor = menuConfig.subtitleAsciiColor;
    this.pageExtraName = pageExtraConfig ? pageExtraConfig.name : null;
    this.pageExtraContent = pageExtraConfig ? pageExtraConfig.content : null;
  }

  async menuIndex() {
    clearConsole();

    this.print.titleAscii(this.titleAsciiText, this.titleAsciiPadding);
    log(this.subtitleAsciiColor(this.subtitleAsciiText));
    log(''); // empty row

    try {
      const { cvOptions } = await inquirer.prompt(menuConfig.menuIndexOptions);
      const cleanOption = stripAnsi(cvOptions);

      if (this.pageExtraName && cleanOption === this.pageExtraName) {
        await this.showPageExtra();
      } else if (cleanOption === 'Exit') {
        clearConsole();
      } else {
        clearConsole();
        await this.showPageCV(cleanOption);
        await this.menuBackExit();
      }
    } catch (error) {
      console.error('Error in menuIndex:', error);
    }
  }
  async menuBackExit() {
    log(''); // empty row

    try {
      const { menuBack } = await inquirer.prompt(menuConfig.menuBackExitOptions);
      const cleanOption = stripAnsi(menuBack);

      if (cleanOption === 'Back') {
        clearConsole();
        await this.menuIndex();
      } else {
        clearConsole();
      }
    } catch (error) {
      console.error('Error in menuBackExit:', error);
    }
  }
  async pageCV(option) {
    if (!Object.prototype.hasOwnProperty.call(this.cvContent, option)) {
      console.error('Error: Missing or invalid data for ' + option);
      return;
    }

    const data = this.cvContent[option];

    this.print.titleAscii(option);
    this.print.top();
    this.print.empty();

    data.forEach((info, index) => {
      const formattingFunctions = {
        emptyLine: () => this.print.empty(),
        title: value => log(this.print.text(`${value.toUpperCase()}`, this.cvStyles.titleStyleBox)),
        subtitle: value => log(this.print.text(`${value}`, this.cvStyles.subTitleStyleBox)),
        body: value => log(this.print.text(`${value}`, this.cvStyles.bodyStyleBox)),
      };

      Object.entries(info).forEach(([key, value]) => {
        const formatFunction = formattingFunctions[key] || formattingFunctions.body;
        formatFunction(value);
      });

      if (index !== data.length - 1) {
        this.print.empty();
        this.print.divider();
        this.print.empty();
      }
    });

    this.print.empty();
    this.print.bottom();
  }
  async pageExtra() {
    clearConsole();
    this.print.titleAscii(this.pageExtraName);
    this.print.pageExtraContent(this.pageExtraContent);
    await this.menuBackExit();
  }

  async showMenuIndex() {
    await handleNarrowConsole(this.menuIndex.bind(this), this.cvStyles);
  }
  async showPageCV(option) {
    await handleNarrowConsole(this.pageCV.bind(this, option), this.cvStyles);
  }
  async showPageExtra() {
    await handleNarrowConsole(this.pageExtra.bind(this), this.cvStyles);
  }
}
