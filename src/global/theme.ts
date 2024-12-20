const success = '#47C747';
const warning = '#f9BE14';

const themes = {
  colors: {
    primary: '#FA0B5B',
    primary_loading: '#962349',
    primary_disabled: '#962349',

    secondary: '#395FF5',
    secondary_disabled: '#1c2f7a',

    white: '#fff',

    text: '#47474D',

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
    grid: {
      template: {
        columns: {
          products: {
            1600: {
              minPixels: '1600px',
              grid: 'repeat(auto-fill, minmax(calc(100% / 5), 1fr))',
            },
            1400: {
              minPixels: '1400px',
              grid: 'repeat(auto-fill, minmax(calc(100% / 4), 1fr))',
            },
          }
        },
      },
      gridTemplateColumnsProducts: 'repeat(auto-fill, minmax(calc(100% / 5), 1fr))',
      gridTemplateColumnsPanel: 'repeat(auto-fill, minmax(calc(100% / 5), 1fr))',
    },
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
      defaultHoverPrimary: 'rgba(251, 59, 123, 0.05) 0px 6px 24px 0px, rgba(251, 59, 0, 123.08) 0px 0px 0px 1px',
      border: 'rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
      simple: '1px 1px 5px #DEDEDE',
      warning: `1px 1px 5px ${warning}`,
    },
    responsive: {
      margin: '10px 20px',
      padding: '10px 20px',
      paddingHeader: '0 20px',
      maxWidth: '600px',

      maxScreen: '1920px',
      tablet: '1090px'
    }
  }
};

export {
  themes
};