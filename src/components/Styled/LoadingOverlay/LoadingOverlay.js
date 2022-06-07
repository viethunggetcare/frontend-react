import React from 'react';
import classNames from "clsx";

import { 
  Box,
  Typography,
  CircularProgress,
  withStyles  
} from '@material-ui/core';

import styles from './loadingOverlayStyles';

const LoadingOverlay = ({ className, text = 'Đang tải...', classes, children, loading, ...otherProps }) => {
  const loadingOverlayClasses = classNames({
    [className]: className !== undefined,
    [classes.root]:  true,
  });
  return (
    <Box className={loadingOverlayClasses} {...otherProps}>
      {
        loading && <>
          <Box className={classes.loading}>
            <Box className={classes.loadingContent}>
              <CircularProgress className={classes.loadingBarIcon}/>
              <Typography>{text}</Typography>
            </Box>
          </Box>
        </>
      }
      {children}
    </Box>
  )
}

export default withStyles(styles,{ name: "LoadingOverlay" })(LoadingOverlay)