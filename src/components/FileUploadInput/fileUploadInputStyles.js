import { toNumber, isNumber } from 'lodash';
 
export default (theme) => {
  return {
    root: {
      display: 'inline-flex',
      backgroundColor: theme.palette.grey[100],
      
      borderRadius: theme.shape.borderRadius,
    },
    marginNormal: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
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
    fullWidth: {
      width: '100%',
      '& $control': {
        width: '100%',
      }
    },  
    control: {
      padding: theme.spacing(1.75),
    },
    fileInput: {
      display: 'none'
    },
    dropped: {
      padding: theme.spacing(2.3125,1.75),
      backgroundColor: theme.palette.common.white,
      border: `1px dashed rgba(0, 0, 0, 0.23)`,
      borderRadius: theme.shape.borderRadius,
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '&:hover': {
        borderColor: theme.palette.text.primary,
      },
      '&:focus': {
        borderColor: theme.palette.primary.main,
      },
      '& $icon': {
      }
    },
    placeholder: {
      color: theme.palette.text.secondary,
      textAlign: 'center',
      ...theme.typography.body1,  
    },
    formLabel: {
      '& + $dropped': {
        marginTop: theme.spacing(.5),
      },
    },
    formLabelAsterisk: {
      color: theme.palette.error.main
    },
    error: {
      '& $dropped': {
        borderColor: theme.palette.error.main
      }
    },
    circularProgress: {},
    icon: {},
    disabled: {
      '& $dropped': {
        cursor: 'no-drop',
      }
    },
    fileList: {
      marginTop: theme.spacing(1),
      color: theme.palette.text.secondary,
      '& $icon': {
        marginRight: theme.spacing(1),
        color: theme.palette.text.secondary,
      }
    },
    fileListSecondaryAction: {
      display: 'flex',
      alignItems: 'center',
      '& $circularProgress': {
        marginRight: theme.spacing(.5)
      }
    }, 
    hightlight: {
      '& $dropped': {
        borderColor: theme.palette.primary.main
      },
    }
  }
}