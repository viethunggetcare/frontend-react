import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { bindActionToPromise } from 'utils/helpers'
import { 
  productActions
} from 'redux/actions'

import {
  makeStyles
} from '@material-ui/core'
import DataList from 'components/DataList/DataList';

import ProductCard from './ProductCard/ProductCard'

import styles from './productsStyles'

const useStyles = makeStyles(styles,{name: 'Products'})

const Products = (props) => {
  const { 
    products,
    productsTotal,
    productsErrorMessage,
    productsLoading,
    fetchProducts
  } = props;
  
  const [page,setPage] = React.useState(1)
  const [pageSize] = React.useState(2)

  const { i18n } = useTranslation();

  const classes = useStyles();

  const renderItem = React.useCallback(({ item }) => {
    return (
      <ProductCard
        className={classes.productCard}
        product={item}
      />
    )
  },[])

  const renderNoData = React.useCallback(() => {
    return (
      <div className={classes.noOptions}>
        {productsErrorMessage}
      </div>
    )
  },[])

  const gridContainerProps = React.useMemo(() => ({
    spacing: 2
  }))

  const gridItemProps = React.useMemo(() => ({
    xs: 12,
    sm: 6,
    md: 3,
  }))

  const fetchData = React.useCallback(({ page, pageSize }) => {
    fetchProducts({
      params: {
        language: i18n.language,
        product_type_id: 1,
        limit: pageSize,
        page,
      }
    })
  },[])

  React.useEffect(() => {
    // i18n.changeLanguage('zh_HK')
  },[])

  return (
    <div className={classes.root}>
      <DataList
        data={products || []}
        paginationTotal={productsTotal || 0}
        paginationPage={page}
        paginationPageSize={pageSize}
        loading={productsLoading}
        gridContainerProps={gridContainerProps}
        gridItemProps={gridItemProps}
        renderNoData={renderNoData}
        renderItem={renderItem}
        onFetchData={fetchData}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  )
}

Products.propTypes = {
  className: PropTypes.string
}

const mapStateToProps = ({ productReducer }) => {
  const { 
    products,
    productsTotal,
    productsErrorMessage,
    productsLoading
  } = productReducer;
  return {
    products,
    productsTotal,
    productsErrorMessage,
    productsLoading
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: bindActionToPromise(dispatch, productActions.fetchProducts),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(React.memo(Products));