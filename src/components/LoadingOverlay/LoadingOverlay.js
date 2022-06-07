import React from 'react';
import classNames from "clsx";

import { 
  Typography,
  CircularProgress,
  withStyles  
} from '@material-ui/core';
import StyledBox from '../Styled/Box/Box';

const styles = (theme) => {
  return {
    root: {
      position: 'relative',
    },
    loading: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: 99,
      backgroundColor: "rgba(255,255,255,0.7)",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing(1),
      color: theme.palette.grey['A700'],
    },
    loadingBarIcon: {
      color: theme.palette.grey['A700']
    }
  }
};

const LoadingOverlay = ({ className, text = 'Đang tải...', classes, children, loading, ...otherProps }) => {
  const loadingOverlayClasses = classNames({
    [className]: className !== undefined,
    [classes.root]:  true,
  });
  return (
    <StyledBox className={loadingOverlayClasses} {...otherProps}>
      {
        loading && <>
          <StyledBox className={classes.loading}>
            <StyledBox className={classes.loadingContent}>
              <CircularProgress className={classes.loadingBarIcon}/>
              <Typography>{text}</Typography>
            </StyledBox>
          </StyledBox>
        </>
      }
      {children}
    </StyledBox>
  )
}

export default withStyles(styles,{ name: "LoadingOverlay" })(LoadingOverlay)