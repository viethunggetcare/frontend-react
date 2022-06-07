import React from 'react' 

import {
  Avatar,
  makeStyles
} from '@material-ui/core'
import StyledTypography from 'components/Styled/Typography/Typography'

import styles from './productStyles';

const useStyles = makeStyles(styles,{name: 'ModuleThemeProduct'});

const Product = (props) => {
  const { className, option, optionState } = props;
  const classes = useStyles();
  
  return (
    <div className={className}>
      <Avatar
        variant="rounded"
        className={classes.thumbnail}
        src={option.thumbnail}
      >
        {option.name.charAt(0).toUpperCase()}
      </Avatar>
      <StyledTypography className={classes.title} >{option.name}</StyledTypography>
    </div>
  )
}

export default Product