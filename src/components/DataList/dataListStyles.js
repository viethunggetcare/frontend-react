export default (theme) => {
  return {
    loading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(2),
      width: '100%',
    },
    tablePaginationToolbar: {
      '@media only screen and (max-width: 768px)': {
        padding: theme.spacing(1,2),
        flexWrap: 'wrap',
        justifyContent: 'center',
      }
    },
    pagination: {
      marginTop: theme.spacing(2),
    },
    paginationUl: {
      justifyContent: 'flex-end',
      flexWrap: 'nowrap',
      padding: theme.spacing(0,2),
      '@media only screen and (max-width: 768px)': {
        flexWrap: 'wrap',
        justifyContent: 'center',
      }
    },
  }
}