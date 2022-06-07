export default (theme) => ({
  '.thin-scroll': {
    '&::-webkit-scrollbar': {
      width: 6,
      backgroundColor: "#F5F5F5",
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': "inset 0 0 6px rgba(0,0,0,0.00)",
      backgroundColor: "#f1f1f1",
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: "#c1c1c1"
    },
  },
  '.Divider-element': {
    position: 'relative',
    textAlign: 'center',
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      margin: 'auto',
      borderBottom: `1px solid ${theme.palette.divider}`,
      maxWidth: 'calc(50% - (50px / 2))',
      top: '50%'
    },
    '&:before': {
      left: 'calc(50% + (50px / 2))',
      width: '100%',
    },
    '&:after': {
      right: 'calc(50% + (50px / 2))',
      width: '100%',
    }
  },
  '.text-primary': {
    color: theme.palette.primary.main
  }
})