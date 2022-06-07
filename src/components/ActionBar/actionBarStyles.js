export default (theme) => {
  return {
    appBar: {
      width: `calc(100% + ${theme.spacing(6)}px)`,
      marginLeft: theme.spacing(-3),
      marginRight: theme.spacing(-3),
      boxShadow: 'none',
      backgroundColor: 'transparent',
      transition: theme.transitions.create(['background-color','border-bottom'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      top: 64,
      [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(-2),
        marginRight: theme.spacing(-2),
        width: `calc(100% + ${theme.spacing(4)}px)`,
      },
      [theme.breakpoints.down('xs')]: {
        top: 56,
      },
    },
    
    appBarSticky: {
      backgroundColor: theme.palette.background.paper,
      transition: theme.transitions.create(['background-color','border-bottom'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      opacity: 1,
      boxShadow: 'inherit',
      borderBottom: `1px solid ${theme.palette.divider}`
    },

    actionListItemIcon: {
      minWidth: theme.spacing(4.5)
    }
  }
}