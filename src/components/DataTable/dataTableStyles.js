const styles = (theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    tableContainer: {
      backgroundColor: 'inherit',
      flex: 1,
      overflowY: 'auto',
    },
    table: {
      backgroundColor: 'inherit',
      '&$tableStriped $tableBody:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    tableRowHover: {
      '&:hover': {
        backgroundColor: `${theme.palette.grey[100]} !important`,
      }
    },
    tableStickyHeader: {},
    tableStriped: {},
    tableHead: {
      backgroundColor: theme.palette.grey[200],
      '& $tableCell': {
        fontWeight: 600,
      },
      '& $tableCellPinningAlign': {
        zIndex: 3
      }
    },
    tableCellPinningAlign: {
      position: 'sticky',
      zIndex: 1,
    },
    tableCellPinningAlignLeft: {
      left: 0,
    },
    tableCellPinningAlignRight: {
      right: 0
    },
    tableCellExpandableRows: {
      borderBottom: 'unset'
    },
    tableBody: {
      backgroundColor: 'inherit',
      '& $tableCellPinningAlign': {
        backgroundColor: 'inherit'
      }
    },
    tableRow: {
      backgroundColor: 'inherit',
    },
    tableCell: {},
    tableSortLabelIcon: {
      opacity: 1
    },
    tableCellStickyHeader: {
      left: 'inherit'
    },
    tablePaginationToolbar: {
      '@media only screen and (max-width: 768px)': {
        padding: theme.spacing(1,2),
        flexWrap: 'wrap',
        justifyContent: 'center',
      }
    },
    paginationUl: {
      flexWrap: 'nowrap',
      padding: theme.spacing(0,2),
      '@media only screen and (max-width: 768px)': {
        flexWrap: 'wrap',
        justifyContent: 'center',
      }
    },
    styledProgressRoot: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '3rem 1rem',
      gap: '.5rem',
    },
    styledProgressCircleBottom: {
      color: '#EEE'
    },
    styledProgressCircleTop: {
      color: '#1a90ff',
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
    },
    styledProgressCircle: {
      strokeLinecap: 'round',
    },
    styledProgressIcon: {
      position: 'relative',
    },
    styledProgressContent: {
      fontSize: '1rem'
    },
    expandableRowsContainer: {
      margin: theme.spacing(2,0)
    }
  }
};

export default styles;