export default (theme) => {
  return {
    root: {
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: theme.shadows[2],
      borderRadius: theme.shape.borderRadius,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    },
    content: {
      flex: 1,
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column'
    },  
    contentTitle: {
      height: 64,
    },
    contentDescription: {
      flex: 1
    },
    action: {
      padding: theme.spacing(2),
    },
    imageContainer: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      position: 'relative',
      paddingTop: `calc(${(1/(16/9))*100}%)` 
    },
    image: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: `100%`,
      objectFit: 'contain'
    }
  }
}