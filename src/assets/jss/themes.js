export const defaultTheme = {
  palette: {
    primary: {
      main: '#A12F60',
    },
    action: {
      disabled: 'rgba(0, 0, 0, 0.13)',
    },
    text: {
      primary: '#333333',
      secondary: '#858585',
    }
  },
  typography: {
    fontFamily: ['Nunito', 'Open Sans', 'sans-serif'].join(','),
    fontSize: 14,
    button: {
      fontFamily: ['Nunito', 'Open Sans', 'sans-serif'].join(','),
      textTransform: 'none',
    },
    body1: {
      letterSpacing: 0,
    }
  },
  zIndex: {
    backdrop: 1600
  },
  aspectRatio: {
    format: (aspectRatio) => {
      if ( typeof aspectRatio === 'string' ) {
        const aspectRatioArr = aspectRatio.split(':');
        return aspectRatioArr[0]/aspectRatioArr[1];
      }
      return aspectRatio;
    }
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#232F34',
        color: '#FFFFFF',    
        fontSize: 12
      },
    },
  },
};
