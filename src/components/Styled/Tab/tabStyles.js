export default (theme) => {
  return {
    root: {
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightMedium,
      padding: theme.spacing(1,2),
      '&$selected': {
        fontWeight: theme.typography.fontWeightBold,
      },
    },
    textColorPrimary: {
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    textColorSecondary: {
      '&:hover': {
        color: theme.palette.secondary.main,
      },
    },
    selected: {}
  }
}