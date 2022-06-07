import React from 'react';
import classNames from "clsx";

import { 
  Box,
  Typography,
  CircularProgress,
  withStyles  
} from '@material-ui/core';

import styles from './loadingStyles';

const CircularProgressLoading = React.memo(
  ({ classes }) => (
    <Box className={classes.circularProgressLoading}>
      <CircularProgress
        variant="determinate"
        className={classes.circularProgressBackground}
        size={40}
        thickness={4}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.circularProgressLinear}
        classes={{
          circle: classes.circularProgressCircle,
        }}
        size={40}
        thickness={4}
      />
    </Box>
))
const Loading = (props) => {
  const { 
    className, 
    text = 'Đang tải...', 
    classes, 
    children, 
    ...otherProps 
  } = props;
  const loadingClasses = classNames({
    [className]: className !== undefined,
    [classes.root]:  true,
  });
  
  return (
    <Box className={loadingClasses} {...otherProps}>
      <CircularProgressLoading 
        classes={classes}
      />
      <Typography className={classes.content} component="div">
        {text}
      </Typography>
    </Box>
  )
}

export default withStyles(styles,{ name: "Loading" })(React.memo(Loading))