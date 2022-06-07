const styles = (theme) => {
  return {
    root: {
      position: 'relative',
    },
    loading: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: 9999,
      backgroundColor: "rgba(255,255,255,0.7)",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing(1),
      color: theme.palette.grey['A700'],
    },
    loadingBarIcon: {
      color: theme.palette.grey['A700']
    }
  }
};

export default styles;