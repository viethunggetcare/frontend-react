export default (theme) => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
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