import React from 'react';

import {
  Tooltip,
  makeStyles
} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const styles = (theme) => {
  return {
    icon: {
      fontSize: 20,
      verticalAlign: 'middle',
      marginLeft: theme.spacing(.5)
    },
    required: {
      color: theme.palette.error.main,
      marginLeft: theme.spacing(.5)
    }
  }
}

const useStyles = makeStyles(styles,{name: 'CustomLabel'})

const CustomLabel = (props) => {
  const { 
    children,
    helperText, 
    required,
  } = props;

  const classes = useStyles();

  return (
    <>
      {children} 
      {required && <span className={classes.required}>*</span>}
      {helperText && (
        <Tooltip title={helperText} placement="top">
          <HelpOutlineIcon className={classes.icon}/>
        </Tooltip>
      )} 
    </>
  )
}

CustomLabel.defaultProps = {
  helperText: '', 
  required: false
}

export default CustomLabel;
