import chalk from 'chalk';
export const clearConsole = () => process.stdout.write('\x1Bc'); // Reliable Console Escape Sequence
export const log = value => console.log(value); // shorthand

export async function importConfig(defaultModule, modulePath, errorMessage) {
  try {
    const module = await import(modulePath);
    return module[Object.keys(module)[0]]; // Assumes default export
  } catch {
    console.log(errorMessage);
    return defaultModule;
  }
}

export async function importExtraPageConfig() {
  try {
    const extraPageModule = await import('../config/config.extraPage.js');
    return {
      name: extraPageModule.extraPageName,
      content: extraPageModule.extraPageContent,
    };
  } catch {
    console.log('Extra section config not found.');
    return null;
  }
}

export async function handleNarrowConsole(option, cvStyles) {
  const consoleWidth = process.stdout.columns;

  if (consoleWidth < cvStyles.maxCvWidth) {
    await checkConsoleWidth(option, cvStyles);
  } else {
    await option();
  }
}

export async function checkConsoleWidth(option, cvStyles) {
  const intervalCheckWidth = setInterval(() => {
    const newConsoleWidth = process.stdout.columns;

    clearConsole();
    if (newConsoleWidth < cvStyles.maxCvWidth) {
      log(chalk.red('Please increase the width of the terminal window.'));
    } else {
      clearInterval(intervalCheckWidth);
      setTimeout(option, 1000);
    }
  }, 250);
}
