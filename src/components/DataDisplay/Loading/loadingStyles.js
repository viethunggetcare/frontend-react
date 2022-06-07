const styles = (theme) => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: theme.spacing(1),
      minHeight: 250
    },
    circularProgressLoading: {
      position: 'relative',
    },
    circularProgressBackground: {
      color: theme.palette.grey[200]
    },
    circularProgressLinear: {
      color: '#1a90ff',
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
    },
    circularProgressCircle: {
      strokeLinecap: 'round',
    },
  }
};

export default styles;