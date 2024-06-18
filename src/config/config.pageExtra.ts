import chalk from 'chalk';
import { shades } from './config.themeColors.js';

export const pageExtraName = 'About Me';
const hs = (text: string) => chalk.hex(shades[3]).bold(text); // highlight style
export const pageExtraContent = `
╭──────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                      │
│          .-=-_=_-=-.                                                                 │
│         /|"  """  "|\\       ${hs('Hello, my name is Arthur!')}                                │
│         || __   __ ||       ${hs('I design stunning and user-friendly UIs and')}              │
│        ( ""(@)${hs('"')}(@)"" )      ${hs('implement them in scaling enterprise-level apps.')}         │
│        ${hs('°')}!    ${hs(':')}J     !${hs('°')}                                                               │
│          \\  \`${hs('.')}_${hs('.')}´  /        ${hs('Enjoy going through my CV!')}                               │
│           !\`._;_.´!                                                                  │
│     _.-~~˜'-.___.-'˜~~-._                                                            │
│   /                       \\                                                          │
│                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────╯
`;
