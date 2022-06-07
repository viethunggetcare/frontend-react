const styles = (theme) => {
  return {
    root: {
      flexWrap: 'nowrap',
      alignItems: 'center',
      gap: theme.spacing(.5),
    },
    gutters: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    title: {
      flex: '1 1 100%',
    },
    search: {
      flexGrow: 1
    },
    popper: {
      zIndex: theme.zIndex.tooltip
    }
  }
};

export default styles;