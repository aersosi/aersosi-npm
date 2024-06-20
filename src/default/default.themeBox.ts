import { IBoxTheme } from 'functions.d.print.js';

export const themeBox: IBoxTheme = {
  square: {
    topLeft: '┏',
    topRight: '┓',
    bottomRight: '┛',
    bottomLeft: '┗',
    vertical: '┃',
    centerLeft: '┣',
    horizontal: '━',
    centerRight: '┫',
    empty: ' ',
  },
  rounded: {
    topLeft: '╭',
    topRight: '╮',
    bottomRight: '╯',
    bottomLeft: '╰',
    vertical: '│',
    centerLeft: '├',
    horizontal: '─',
    centerRight: '┤',
    empty: ' ',
  },
  double: {
    topLeft: '╔',
    topRight: '╗',
    bottomRight: '╝',
    bottomLeft: '╚',
    vertical: '║',
    centerLeft: '╠',
    horizontal: '═',
    centerRight: '╣',
    empty: ' ',
  },
};
