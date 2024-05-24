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
const extraPageConfig = await importExtraPageConfig();

export class Core {
  constructor() {
    this.cvContent = { ...defaultCvContent, ...configCvContent };
    this.cvStyles = { ...defaultCvStyles, ...configCvStyles };
    this.print = new Print(this.cvStyles);
    this.titleAsciiText = menuConfig.titleAsciiText;
    this.titleAsciiPadding = menuConfig.titleAsciiPadding;
    this.subtitleAsciiText = menuConfig.subtitleAsciiText;
    this.subtitleAsciiColor = menuConfig.subtitleAsciiColor;
    this.extraPageName = extraPageConfig ? extraPageConfig.name : null;
    this.extraPageContent = extraPageConfig ? extraPageConfig.content : null;
  }

  async menuIndex() {
    clearConsole();

    this.print.titleAscii(this.titleAsciiText, this.titleAsciiPadding);
    log(this.subtitleAsciiColor(this.subtitleAsciiText));
    log(''); // empty row

    try {
      const { resumeOptions } = await inquirer.prompt(menuConfig.menuIndexOptions);
      const cleanOption = stripAnsi(resumeOptions);

      if (this.extraPageName && cleanOption === this.extraPageName) {
        await this.showExtraPage();
      } else if (cleanOption === 'Exit') {
        clearConsole();
      } else {
        clearConsole();
        await this.showCvPage(cleanOption);
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

  async cvPage(option) {
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
        title: value => log(this.print.text(`${value.toUpperCase()}`, this.cvStyles.titleStyle)),
        subtitle: value => log(this.print.text(`${value}`, this.cvStyles.subTitleStyle)),
        body: value => log(this.print.text(`${value}`, this.cvStyles.bodyStyle)),
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

  async extraPage() {
    clearConsole();
    this.print.titleAscii(this.extraPageName);
    this.print.extraPageContent(this.extraPageContent);
    await this.menuBackExit();
  }

  async showMenuIndex() {
    await handleNarrowConsole(this.menuIndex.bind(this), this.cvStyles);
  }

  async showCvPage(option) {
    await handleNarrowConsole(this.cvPage.bind(this, option), this.cvStyles);
  }

  async showExtraPage() {
    await handleNarrowConsole(this.extraPage.bind(this), this.cvStyles);
  }
}
