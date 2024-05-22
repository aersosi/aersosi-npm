import chalk from "chalk";
import {orangeColors} from "../core/config.colors.js";

const hightlight = (text) => chalk.hex(orangeColors[2]).bold(text);

export const ASCIIart = `
╭──────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                      │
│          .-=-_=_-=-.                                                                 │
│         /|"  """  "|\\       ${hightlight('Hello, my name is Arthur!')}                                │
│         || __   __ ||       ${hightlight('I design stunning and user-friendly UIs and')}              │
│        ( ""(@)${hightlight('"')}(@)"" )      ${hightlight('implement them in scaling enterprise-level apps.')}         │
│        ${hightlight('°')}!    ${hightlight(':')}J     !${hightlight('°')}                                                               │
│          \\  \`${hightlight('.')}_${hightlight('.')}´  /        ${hightlight('Enjoy going through my CV!')}                               │
│           !\`._;_.´!                                                                  │
│     _.-~~˜'-.___.-'˜~~-._                                                            │
│   /                       \\                                                          │
│                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────╯
`;