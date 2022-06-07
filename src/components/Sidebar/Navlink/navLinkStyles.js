export default (theme) => {
  return {
    listItem: {
      paddingLeft: `var(--menu-item-padding-left)`,
      color: theme.palette.text.secondary,
      '& $icon': {
        marginRight: theme.spacing(2)
      }
    },
    listItemSelected: {
      '& $listItemText,& $icon': {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightBold
      }
    },
    expandMoreIcon: {
      transform: 'rotate(90deg)',
      transition: theme.transitions.create('transform', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      '&$collapseActive': {
        transform: 'rotate(0deg)',
      }
    },
    listItemText: {
      ...theme.typography.body1
    },
    icon: {},
    collapseActive: {}
  }
}