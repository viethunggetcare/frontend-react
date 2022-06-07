const styles = (theme) => {
  return {
    dialogPaper: {
      minHeight: `calc(100% - ${theme.spacing(8)}px)`
    },
    dialogTitle: {
      position: 'relative',
    },
    dialogTitleRightControls: {
      right: 0
    },
    dialogTitleControls: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      padding: theme.spacing(1)
    },
    dialogContent: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    },
    wrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }
}

export default styles;