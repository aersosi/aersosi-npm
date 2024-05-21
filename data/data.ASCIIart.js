// import chalk from 'chalk';

// export const ASCIIart = `
// |￣￣￣￣￣￣￣￣￣￣|
// ${chalk.hex('#ff7124').bold('     This is cute')}
// ${chalk.hex('#ff7124').bold('       but not')}
// ${chalk.hex('#ff7124').bold('      accessible')}
// |＿＿＿＿＿＿＿＿＿＿|
// ${chalk.hex('#ffffff')('  (\\__/)  ||')}
// ${chalk.hex('#ffffff')('  (•ㅅ•)  ||)}
// ${chalk.hex('#ffffff')('  /  　  づ')}
// `;


import chalk from "chalk";
import {orangeColors} from "../core/config.colors.js";


const box = `
╭──────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────╯
`;

export const ASCIIart = `
       .-=-_=_-=-.
      /|"  """  "|\\    ╭─────────────╮   
      !  ……   ……  !    │ ${chalk.hex(orangeColors[1]).bold('Moin, Moin!')} │
     ( ""(@)"(@)"" )   ╰─────────────╯
     °!    :J     !°        
       \\  \`._.´  /       
        !\`._;_.´!       
  _.-~~˜'-.___.-'˜~~-._
/                       \\
`;



//  °•⁄˜~`˜`<>≥≤ßåœ∑´®®†¥¨ˆ¨ˆøπ“‘æ.…¬˚∆˙©ƒ∂ßåΩ≈ç√∫˜∫√∫˜˜µ≤≥`