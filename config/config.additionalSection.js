import chalk from "chalk";
import {orangeShades} from "./config.themeColors.js";

export const additionalSectionEnable = true;
export const additionalSectionName = "About Me";

const hightlight = (text) => chalk.hex(orangeShades[3]).bold(text);

export const AdditionalSectionContent = `
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
