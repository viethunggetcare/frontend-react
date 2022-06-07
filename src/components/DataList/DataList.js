import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';

import {
  AppBar,
  Grid,
  TablePagination,
  CircularProgress,
  makeStyles
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import StyledContainer from 'components/Styled/Container/Container';
import StyledToolbar from 'components/Styled/Toolbar/Toolbar';

import StyledTypography from 'components/Styled/Typography/Typography';

import styles from './dataListStyles'

const useStyles = makeStyles(styles,{name: 'DataList'})

const DataList = (props) => {
  const {
    className,
    data,
    dataIndex,
    loading,
    gridContainerProps,
    gridItemProps,
    query,
    paginationTotal,
    paginationPage,
    paginationPageSize,
    paginationPageSizeOptions,
    renderItem,
    onFetchData,
    onPageChange,
  } = props;

  const classes = useStyles();

  React.useEffect(() => {
    onFetchData && onFetchData({
      page: paginationPage,
      pageSize: paginationPageSize,
      query
    })
  },[onFetchData, paginationPage, paginationPageSize, query])

  return (
    <>
      {(!loading && data.length > 0) && (
        <Grid 
          container
          {...gridContainerProps}
        >
          {data.map((dataItem,index) => (
            <Grid 
              key={dataItem[dataIndex] || index} 
              item
              {...gridItemProps}
            >
              {renderItem({
                item: dataItem,
                index,
              })}
            </Grid>
          ))}
        </Grid>
      )}
      {loading && (
        <div className={classes.loading}>
          <CircularProgress/>
        </div>
      )}
      
      <Pagination
        classes={{
          root: classes.pagination,
          ul: classes.paginationUl
        }}
        showLastButton
        showFirstButton
        page={paginationPage}
        count={Math.ceil(paginationTotal/paginationPageSize)} 
        color="primary" 
        siblingCount={2}
        onChange={(e,newPage) => onPageChange && onPageChange(newPage)}
      />
    </>
  )
}

DataList.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  dataIndex: PropTypes.string,
  gridContainerProps: PropTypes.object,
  gridItemProps: PropTypes.object,
  query: PropTypes.object,
  loading: PropTypes.bool,
  paginationTotal: PropTypes.number,
  paginationPage: PropTypes.number,
  paginationPageSize: PropTypes.number,
  paginationPageSizeOptions: PropTypes.array,
  renderItem: PropTypes.func.isRequired,
  onFetchData: PropTypes.func,
  onPageChange: PropTypes.func,
}

export default React.memo(DataList);