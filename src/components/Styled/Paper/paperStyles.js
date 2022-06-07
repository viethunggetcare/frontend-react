const styles = (theme) => {
  return {
    root: (props) => {
      const types = {
        0: 'none',
        1: '0 1px 1px 0 rgba(0,0,0,.05)'
      }
      return {
        boxShadow: types[props.boxShadowType] || undefined,
        padding: props.spacing ? theme.spacing(props.spacing) : undefined,
        color: theme.palette.text.primary,
      }
    },
    gutters: (props) => {
      const gutterSizeMap = {
        'sm': {
          header: theme.spacing(1,2),
          body: theme.spacing(1,2),
          footer: theme.spacing(1,2),
          middleOverflow: theme.spacing(2)
        },
        'md': {
          header: theme.spacing(2,3),
          body: theme.spacing(2,3),
          footer: theme.spacing(2,3),
          middleOverflow: theme.spacing(3)
        }
      }
      const gutter = gutterSizeMap[props.gutters] ? gutterSizeMap[props.gutters] : gutterSizeMap['md'];
      return {
        padding: (props.header || props.footer) ? undefined : gutter.body,
        '& .StyledPaper-header': {
          padding: gutter.header,
        },
        '& .StyledPaper-body': {
          padding: gutter.body,
        },
        '& .StyledPaper-footer': {
          padding: gutter.footer,
        },
        '& .StyledPaper-middleOverflow': {
          marginLeft: -gutter.middleOverflow,
          marginRight: -gutter.middleOverflow,
          '& .MuiTable-root': {
            '& caption': {
              paddingLeft: gutter.middleOverflow,
              paddingRight: gutter.middleOverflow
            },
            '& .MuiTableHead-root > .MuiTableRow-root': {
              '& > .MuiTableCell-root:first-child': {
                paddingLeft: gutter.middleOverflow
              },
              '& > .MuiTableCell-root:last-child': {
                paddingRight: gutter.middleOverflow
              }
            },
            '& .MuiTableBody-root > .MuiTableRow-root': {
              '& > .MuiTableCell-root:first-child': {
                paddingLeft: gutter.middleOverflow
              },
              '& > .MuiTableCell-root:last-child': {
                paddingRight: gutter.middleOverflow
              }
            },
          }
        }
      }
    },
    body: {},
    header: {
      overflow: 'hidden',
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius,
      ...theme.typography.h6
    },
    footer: (props) => ({
      overflow: 'hidden',
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
      ...theme.typography.h6
    }),
  }
};

export default styles;