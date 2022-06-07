export default (theme) => {
  return {
    drawer: {
      width: 240,
      flexShrink: 0,
    },
    drawerContainer: {
      width: '100%',
      position: 'relative',
      flex: 1,
    },
    drawerContent: {
      position: 'absolute',
      height: '100%',
      width: 240,
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    drawerOpen: {
      width: 240,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      [theme.breakpoints.up('sm')]: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
      },
    },

    listItem: {
      color: theme.palette.text.secondary,
      '& $icon': {
        marginRight: theme.spacing(2)
      }
    },
    icon: {}
  }
}