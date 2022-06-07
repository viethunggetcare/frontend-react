const styles = (theme) => {
  return {
    dialogTitle: {
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    dialogContent: {
      paddingTop: 0,
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      color: "rgba(0,0,0,.6)",
      ...theme.typography.body1,
      whiteSpace: "pre-line"
    },
    dialogActions: {
      '&.MuiDialogActions-spacing': {
        padding: theme.spacing(0,1,1)
      }
    }
  }
}

export default styles;