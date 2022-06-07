const styles = (theme) => {
  return {
    root: {
      '& .MuiInputBase-input': {
        marginLeft: 12,
        '&::-webkit-calendar-picker-indicator': {
          '-webkit-appearance': 'none',
          display: 'none'
        }
      }
    },
    popper: {
      zIndex: theme.zIndex.tooltip,
    }
  }
}

export default styles;