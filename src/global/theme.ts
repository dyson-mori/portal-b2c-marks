const success = '#47C747';
const warning = '#f9BE14';

const themes = {
  colors: {
    primary: '#FA0B5B',
    primary_loading: '#962349',

    white: '#fff',

    text: '#303030',

    select: '#888',
    // background: '#fff',
    background: '#f1f1f1',

    hover: '#f1f1f1',

    success,
    warning,
  },
  font: {
    size: {
      thin: '6px',
      extraLight: '8px',
      light: '10px',
      normal: '12px',
      medium: '14px',
      semiBold: '16px',
      bold: '18px',
      extraBold: '20px',
      black: '22px',
      extraBlack: '24px',
      large: '18px'
    },
    weight: {
      '100': 100,
      '200': 200,
      '300': 300,
      '400': 400,
      '500': 500,
      '600': 600,
      '700': 700,
      '800': 800,
      '900': 900,
    }
  },
  settings: {
    padding: {
      button: '0 10px'
    },
    radius: {
      small: '3px',
      default: '6px',
      large: '9px'
    },
    box: {
      default: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
      border: 'rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
      simple: '1px 1px 5px #DEDEDE',
      warning: `1px 1px 5px ${warning}`,
    }
  }
};

export {
  themes
};