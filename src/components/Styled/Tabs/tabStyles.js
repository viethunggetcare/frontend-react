export default (theme) => {
  return {
    root: {
      position: 'relative',
    },
    scrollButtons: {
      position: 'absolute',
      height: '100%',
      backgroundColor: '#FFF',
      zIndex: 1,
      '&:last-child': {
        right: 0,
      }
    },
  }
}