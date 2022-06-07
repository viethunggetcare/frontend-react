const styles = (theme) => {
  return {
    root: {
      zIndex: theme.zIndex.backdrop
    },
    circularProgress: {
      color: theme.palette.common.white,
      marginBottom: theme.spacing(2)
    },
    text: {
      color: theme.palette.common.white,
      ...theme.typography.body1,
    }
  }
}

export default styles;