import inquirer, { QuestionCollection } from 'inquirer';
import stripAnsi from 'strip-ansi';

import { Print } from './functions.print.js';
import {
  clearConsole,
  importConfig,
  log,
  importExtraPageConfig,
  handleNarrowConsole,
} from './functions.helper.js';
import { defaultCvContent } from '../default/default.cvContent.js';
import { defaultICvStyles } from '../default/default.cvStyles.js';
import defaultMenuConfig from '../default/default.inquirerMenu.js';
import { Chalk } from 'chalk';

import type { ICore } from 'functions.d.core.ts';
import type { IConfigCvContent } from 'config.d.cvContent.ts';
import type { IConfigICvStyles } from 'config.d.cvStyles.ts';

// Import configurations with fallback to defaults
const configICvStyles = await importConfig(
  defaultICvStyles,
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

export class Core implements ICore {
  cvContent: IConfigCvContent;
  cvStyles: IConfigICvStyles;
  titleAsciiText: string;
  titleAsciiPadding: number;
  subtitleAsciiText: string;
  subtitleAsciiColor: Chalk;
  pageExtraName: string | null;
  pageExtraContent: string | null;
  print: Print;

  // Initialize properties
  constructor() {
    this.cvContent = { ...defaultCvContent, ...configCvContent };
    this.cvStyles = { ...defaultICvStyles, ...configICvStyles };
    this.print = new Print(this.cvStyles);
    this.titleAsciiText = menuConfig.titleAsciiText;
    this.titleAsciiPadding = menuConfig.titleAsciiPadding ?? 0;
    this.subtitleAsciiText = menuConfig.subtitleAsciiText;
    this.subtitleAsciiColor = menuConfig.subtitleAsciiColor;
    this.pageExtraName = pageExtraConfig ? pageExtraConfig.name : null;
    this.pageExtraContent = pageExtraConfig ? pageExtraConfig.content : null;
  }

  // Display the main menu
  async menuIndex(): Promise<void> {
    clearConsole();

    this.print.titleAscii(this.titleAsciiText, this.titleAsciiPadding);
    log(this.subtitleAsciiColor(this.subtitleAsciiText));
    log(''); // empty row

    const { cvOptions } = await inquirer.prompt(menuConfig.menuIndexOptions as QuestionCollection);
    const cleanOption = stripAnsi(cvOptions);

    if (this.pageExtraName && cleanOption === this.pageExtraName) {
      await this.showPageExtra();
    } else if (cleanOption === 'Exit') {
      clearConsole();
    } else {
      clearConsole();
      await this.showPageCV(cleanOption);
    }
  }

  // Display the back menu
  async menuBack(): Promise<void> {
    log(''); // empty row
    const { menuBack } = await inquirer.prompt(menuConfig.menuBackOptions as QuestionCollection);
    const cleanOption = stripAnsi(menuBack);

    if (cleanOption === 'Back') {
      clearConsole();
      await this.menuIndex();
    } else {
      clearConsole();
    }
  }

  // Display a CV page
  async pageCV(option: string): Promise<void> {
    if (!Object.prototype.hasOwnProperty.call(this.cvContent, option)) {
      console.error('Error: Missing or invalid data for ' + option);
      return;
    }

    const data = this.cvContent[option];

    this.print.titleAscii(option);
    this.print.top();
    this.print.empty();

    // Formatting functions for different content types
    const formattingFunctions = {
      emptyLine: () => this.print.empty(),
      title: (value: string) =>
        log(this.print.text(`${value.toUpperCase()}`, this.cvStyles.titleStyleBox)),
      subtitle: (value: string) => log(this.print.text(`${value}`, this.cvStyles.subTitleStyleBox)),
      body: (value: string) => log(this.print.text(`${value}`, this.cvStyles.bodyStyleBox)),
    };

    // Process and print each piece of data
    data.forEach((info, index) => {
      Object.entries(info).forEach(([key, value]) => {
        const formatFunction =
          formattingFunctions[key as keyof typeof formattingFunctions] || formattingFunctions.body;
        formatFunction(value as string);
      });

      if (index !== data.length - 1) {
        this.print.empty();
        this.print.divider();
        this.print.empty();
      }
    });

    this.print.empty();
    this.print.bottom();

    await this.showMenuBack();
  }

  // Display the extra page
  async pageExtra(): Promise<void> {
    clearConsole();
    this.print.titleAscii(this.pageExtraName || '');
    this.print.pageExtraContent(this.pageExtraContent || '');
    await this.showMenuBack();
  }

  // Show the back menu with error handling
  async showMenuBack(): Promise<void> {
    try {
      await this.menuBack();
    } catch (error) {
      console.error('An unexpected error occurred while showing the menu back.');
      console.debug('Error details:', error);
    }
  }

  // Show the main menu with error handling
  async showMenuIndex(): Promise<void> {
    try {
      await handleNarrowConsole(this.menuIndex.bind(this), this.cvStyles);
    } catch (error) {
      console.error('An unexpected error occurred while showing the menu index.');
      console.debug('Error details:', error);
    }
  }

  // Show a CV page with error handling
  async showPageCV(option: string): Promise<void> {
    try {
      await handleNarrowConsole(this.pageCV.bind(this, option), this.cvStyles);
    } catch (error) {
      console.error('An error occurred while showing the CV page');
      console.debug('Error details:', error);
    }
  }

  // Show the extra page with error handling
  async showPageExtra(): Promise<void> {
    try {
      await handleNarrowConsole(this.pageExtra.bind(this), this.cvStyles);
    } catch (error) {
      console.error('An error occurred while showing the extra page');
      console.debug('Error details:', error);
    }
  }
}
