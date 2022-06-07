export default (theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.default,
      height: '100vh'
    },
    main: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      // height: '100vh',
      // overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    }
  }
}