const styles = (theme) => {
  return {
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
    helperText: {
      marginBottom: theme.spacing(2),
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary
    }
  }
}

export default styles;