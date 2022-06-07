import React from 'react';

import {
  makeStyles
} from '@material-ui/core'
import StyledTypography from 'components/Styled/Typography/Typography'

import styles from './pageNotFoundStyles';

const useStyles = makeStyles(styles,{name: 'PermissionDenied'})

const PageNotFound = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <StyledTypography variant="h2" color="textSecondary" fontWeight="bold">404</StyledTypography>
      <StyledTypography variant="h4" fontWeight="bold" align="center" gutterBottom>Trang không tìm thấy</StyledTypography>
      <StyledTypography color="textSecondary" align="center">
        Trang của bạn hiện không tồn tại
      </StyledTypography>
    </div>
  );
}

export default PageNotFound;
