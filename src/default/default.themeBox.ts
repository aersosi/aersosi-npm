import type { IBoxTheme } from 'functions.d.print.ts';

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
