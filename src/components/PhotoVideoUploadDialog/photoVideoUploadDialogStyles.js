const styles = (theme) => {
  return {
    dialogTitle: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    dialogTitleLeftControls: {
      left: 0,
    },
    dialogTitleRightControls: {
      right: 0,
    },
    dialogTitleControls: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      padding: theme.spacing(1)
    }
  }
}

export default styles;