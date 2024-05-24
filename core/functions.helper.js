export const clearConsole = () => process.stdout.write('\x1Bc'); // Reliable Console Escape Sequence
export const log = (value) => console.log(value); // shorthand

export async function importConfig(defaultModule, modulePath, errorMessage) {
    try {
        const module = await import(modulePath);
        return module[Object.keys(module)[0]]; // Assumes default export
    } catch (e) {
        console.log(errorMessage);
        return defaultModule;
    }
}


export async function importExtraSectionConfig() {
    try {
        const extraSectionModule = await import("../config/config.extraSection.js");
        return {
            name: extraSectionModule.extraSectionName,
            content: extraSectionModule.extraSectionContent
        };
    } catch (e) {
        console.log("Extra section config not found.");
        return null;
    }
}