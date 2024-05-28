import chalk from 'chalk';
import { orangeShades } from './config.themeColors.js';

export const pageExtraName = 'About Me';

const hc = text => chalk.hex(orangeShades[3]).bold(text); // highlight color

export const pageExtraContent = `
╭──────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                      │
│          .-=-_=_-=-.                                                                 │
│         /|"  """  "|\\       ${hc('Hello, my name is Arthur!')}                                │
│         || __   __ ||       ${hc('I design stunning and user-friendly UIs and')}              │
│        ( ""(@)${hc('"')}(@)"" )      ${hc('implement them in scaling enterprise-level apps.')}         │
│        ${hc('°')}!    ${hc(':')}J     !${hc('°')}                                                               │
│          \\  \`${hc('.')}_${hc('.')}´  /        ${hc('Enjoy going through my CV!')}                               │
│           !\`._;_.´!                                                                  │
│     _.-~~˜'-.___.-'˜~~-._                                                            │
│   /                       \\                                                          │
│                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────╯
`;
