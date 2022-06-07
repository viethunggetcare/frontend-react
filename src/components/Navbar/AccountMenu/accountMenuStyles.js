export default (theme) => {
  return {
    accountButton: {
      borderRadius: '50px'
    },
    avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      margin: theme.spacing(-.5),
      marginRight: theme.spacing(.5)
    },
    listItem: {
      color: theme.palette.text.secondary,
      '& $icon': {
        marginRight: theme.spacing(2),
      }
    },
    listItemText: {
      margin: 0
    },
    icon: {}
  }
}