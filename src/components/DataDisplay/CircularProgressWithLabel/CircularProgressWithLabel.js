import React from 'react';
import classNames from "clsx";
import PropTypes from "prop-types";

import { getLinearProgressValue } from 'utils/helpers';

import { CircularProgress, withStyles  } from '@material-ui/core';
import StyledBox from 'components/Styled/Box/Box';

import styles from './circularProgressWithLabelStyles';

const StyledCircularProgress = withStyles(styles,{ name: 'CircularProgress'})(React.forwardRef((props,ref) => {
  const { classes, className, size, progressValue, progressMax, children } = props;
  const styledCircularProgressClasses = classNames({
    [className]: className !== undefined,
  });
  return (
    <StyledBox className={styledCircularProgressClasses} position="relative" display="inline-flex">
      <CircularProgress
        size={size}
        className={classes.circularProgressBackground}
        variant="determinate"
        value={100}
      />
      <CircularProgress 
        size={size}
        variant="determinate" 
        value={getLinearProgressValue({ value: progressValue, max: progressMax })}
      />
      <StyledBox
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
          {children}
      </StyledBox>
    </StyledBox>
  )
}));

StyledCircularProgress.propTypes = {
  progressValue: PropTypes.number,
  progressMax: PropTypes.number,
  size: PropTypes.number,
};

export default StyledCircularProgress;