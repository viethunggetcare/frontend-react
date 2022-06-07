import React from 'react';
import clsx from "clsx";
import PropTypes from "prop-types";

import { 
  TextField, 
  Tooltip,
  makeStyles  
} from '@material-ui/core';

import styles from './textFieldStyles';

const useStyles = makeStyles(styles,{name: 'StyledTextField'});

const acceptOfMargins = ['normal','dense','none']

const Wrapper = React.memo((props) => {
  const {
    tooltipProps,
    children
  } = props;
  if (!tooltipProps) return children;
  return <Tooltip {...tooltipProps}>{children}</Tooltip>
});

const StyledTextField = React.forwardRef((props,ref) => {
  const { 
    tooltipProps, 
    labelRequired, 
    success, 
    label, 
    margin, 
    className,
    ...otherProps 
  } = props;

  const classes = useStyles({ margin });

  const styledTextFieldClasses = clsx({
    [classes.marginLarge]: margin === 'large',
    [classes.marginCustom]: ![undefined,null,''].includes(margin) && ![...acceptOfMargins,'large'].includes(margin),
    [classes.success]: !!success,
    [classes.root]: true,
    [className]: !!className,
  });
  
  return (
    <Wrapper tooltipProps={tooltipProps}>
      <TextField 
        className={styledTextFieldClasses} 
        innerRef={ref} 
        {...otherProps}
        margin={acceptOfMargins.includes(margin) ? margin : undefined}
        label={label !== undefined ? <>{label} {labelRequired && <span className={classes.required}>*</span>}</> : undefined}
      />
    </Wrapper>
  )
})

export default StyledTextField;