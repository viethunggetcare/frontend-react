import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx'

import { numberFormat } from 'utils/helpers';

import {
  makeStyles
} from '@material-ui/core'
import Photo from 'components/Photo/Photo';
import StyledButton from 'components/Styled/Button/Button'

import styles from './productCardStyles'
import StyledTypography from 'components/Styled/Typography/Typography';

const useStyles = makeStyles(styles,{name: 'Products'})

const Products = (props) => {
  const { 
    className,
    product 
  } = props;

  const classes = useStyles();

  const productCardClasses = clsx(classes.root,{
    [className]: !!className
  })

  return (
    <div className={productCardClasses}>
      <div className={classes.imageContainer}>
        <Photo className={classes.image} src={product.images?.[0]?.path} width="100%" />
      </div>
      <div className={classes.content}>
        <StyledTypography 
          className={classes.contentTitle}
          variant="h6" 
          fontWeight="medium" 
          enableTextOverflowTooltip
          textOverflowLinesToShow={2}
          maxWidth="100%"
          name={product.name}
        >
          {product.name}
        </StyledTypography>
        <StyledTypography 
          className={classes.contentDescription}
          enableTextOverflowTooltip
          textOverflowLinesToShow={3}
          maxWidth="100%"
        >
          {product.description}
        </StyledTypography>
      </div>
      <div className={classes.action}>
        <StyledButton 
          variant="contained"
          fullWidth
          color="primary"
        >
          {numberFormat(product.price)} đ
        </StyledButton>
      </div>
    </div>
  )
}

Products.propTypes = {
  className: PropTypes.string,
  product: PropTypes.shape({
    image: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string
    })),
    name: PropTypes.string,
    price: PropTypes.number
  })
}

export default Products;