export default (theme) => {
  return {
    root: {
      zIndex: theme.zIndex.drawer + 1,
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      '& $icon': {
        height: 24,
        marginRight: theme.spacing(.5),
      }
    },
    menuButton: {
      marginRight: theme.spacing(1.25),
    },
    icon: {}
  }
}