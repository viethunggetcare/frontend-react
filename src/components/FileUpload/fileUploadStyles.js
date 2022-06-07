const styles = (theme) => {
  return {
    root: {
      border: `2px dashed rgba(0, 0, 0, 0.23)`,
      borderRadius: theme.shape.borderRadius,

      cursor: 'pointer',
      '&:hover': {
        borderColor: theme.palette.primary.main,
        '& *': {
          color: theme.palette.primary.main,
        }
      },
      '& input': {
        display: "none",
      },
    },
    disabled: {
      cursor: 'default',
      userSelect: 'none',
      borderColor: theme.palette.action.disabled,
      '&:hover': {
        borderColor: theme.palette.action.disabled,
        '& *': {
          color: theme.palette.action.disabled,
        }
      },
      '& *': {
        color: theme.palette.action.disabled,
      }
    },
    hightlight: {
      borderColor: theme.palette.primary.main,
      '& *': {
        color: theme.palette.primary.main,
      }
    },
    aspectRatio: ({ aspectRatio }) => ({
      position: 'relative',
      display: 'block',
      position: 'relative',
      paddingTop: aspectRatio ? `calc(100% * 1 / (${aspectRatio}))` : '',
      minHeight: aspectRatio ? 'auto' : 160
    }),
    wrapper: {

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',

      position: 'absolute',
      top: 0,
      left: 0,

      width: '100%',
      height: '100%',
    },
    helper: {
      display: 'flex',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      fontSize: 64
    },
    title: {
      fontWeight: 600
    }
  }
}

export default styles