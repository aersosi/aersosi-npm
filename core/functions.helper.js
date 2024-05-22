export const clearConsole = () => process.stdout.write('\x1Bc'); // Reliable & clear Console Escape Sequence
export const log = (value) => console.log(value); // shorthand
