import { toNumber, isNumber } from 'lodash';

const styles = (theme) => {
  return {
    root: {
      backgroundColor: theme.palette.common.white,
    },
    marginLarge: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1.5),
    },
    marginCustom: {
      margin: ({ margin }) => {
        try {
          if ( Array.isArray(margin) ) return theme.spacing(...margin);
          if ( toNumber(isNumber(margin)) ) return theme.spacing(margin);
        } catch (e) {}
        return undefined
      }
    },
    required: {
      color: theme.palette.error.main,
      marginLeft: theme.spacing(.5)
    }
  }
};

export default styles;