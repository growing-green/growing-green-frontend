const baseTheme = {
  fontSizes: ['0.5em', '0.7em', '0.9em', '1.1em', '2em'],
  colors: {
    blue: '#07c',
    tomato: 'tomato',
    purple: 'purple',
    white: '#fcfcfc',
    darkGreen: '#386641',
    green: '#587e4e',
    lightGreen: '#9cbd93',
    black: '#111',
    gray: '#444',
    red: '#b12f35',
    darkRed: '#892429',
  },
};

const buttons = {
  outline: {
    borderStyle: 'solid',
    borderWidth: '1px',
    width: '140px',
    height: '20px',
    fontSize: baseTheme.fontSizes[3],
    fontWeight: '600',
    lineHeight: '20px',
    padding: '15px 15px',
    borderRadius: 'none',
  },
  rounded: {
    borderStyle: 'solid',
    borderWidth: '2px',
    width: '200px',
    height: '16px',
    fontSize: baseTheme.fontSizes[3],
    fontWeight: '600',
    lineHeight: '20px',
    padding: '10px 15px',
    borderRadius: '16px',
  },
};

const buttonSizes = {
  small: {
    width: '130px',
    height: '11px',
    fontSize: baseTheme.fontSizes[1],
    fontWeight: '300',
    lineHeight: '20px',
    padding: '13px 15px',
  },
  medium: {
    width: '150px',
    height: '14px',
    fontSize: baseTheme.fontSizes[2],
    fontWeight: '300',
    lineHeight: '13px',
    padding: '14px 17px',
  },
  large: {
    width: '170px',
    height: '20px',
    fontSize: baseTheme.fontSizes[3],
    fontWeight: '600',
    lineHeight: '20px',
    padding: '15px 15px',
  },
  long: {
    width: '300px',
    height: '15px',
    fontSize: baseTheme.fontSizes[3],
    fontWeight: '600',
    lineHeight: '20px',
    padding: '10px 15px',
    borderRadius: '25px',
  },
  short: {
    width: '180px',
    height: '13px',
    fontSize: baseTheme.fontSizes[3],
    fontWeight: '600',
    lineHeight: '20px',
    padding: '8px 15px',
    borderRadius: '25px',
  },
};

const buttonColors = {
  white: {
    background: baseTheme.colors.white,
    text: baseTheme.colors.black,
    shadow: baseTheme.colors.gray,
  },
  green: {
    backgound: baseTheme.colors.green,
    text: baseTheme.colors.black,
    shadow: baseTheme.colors.green,
    border: baseTheme.colors.black,
  },
  translucentGreen: {
    background: 'rgb(88, 126, 78, 0.5)',
    text: baseTheme.colors.darkGreen,
    border: baseTheme.colors.green,
  },
  translucentRed: {
    background: 'rgb(204, 0, 0, 0.5)',
    text: baseTheme.colors.darkRed,
    border: baseTheme.colors.red,
  },
};

module.exports = {
  baseTheme,
  buttonSizes,
  buttonColors,
  buttons,
};
