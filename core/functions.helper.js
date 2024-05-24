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
