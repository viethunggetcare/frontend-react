const styles = (theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      gap: theme.spacing(1)
    },
    imageCrop: {
      position: 'relative',
      flex: 1
    },
    imageCropContent: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: '#EEE',
      display: 'flex',
      alignItems: 'center'
    },
    typography: {}
  }
}

export default styles;