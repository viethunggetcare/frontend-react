import React from 'react';
import classNames from 'clsx';
import clsx from 'clsx'

import {
  Paper,
  makeStyles,
} from '@material-ui/core';
import StyledBox from 'components/Styled/Box/Box';

import styles from './paperStyles';

const useStyles = makeStyles(styles, { name: "StyledPaper", flip: true });

const StyledPaper = (props,ref) => {
  const {
    className, 
    boxShadowType,  
    header,
    footer,
    children,
    spacing,
    gutters,
    classes: muiClasses,
    ...other 
  } = props;
  const {
    root: muiClassRoot,
    ...otherClasses
  } = muiClasses || {};
  const classes = useStyles(props);
  const buttonClasses = classNames({
    [className]: className,
    [clsx(classes.root,'StyledPaper-root')]: true,
    [clsx(classes.gutters,'StyledPaper-gutters')]: !!gutters,
    [muiClassRoot]: muiClassRoot,
  });

  return (
    <Paper ref={ref} classes={{ ...otherClasses, root: buttonClasses }} {...other}>
      {header && (
        <StyledBox className={clsx(classes.header,'StyledPaper-header')}>
          {header}
        </StyledBox>
      )}
      {
        (header || footer) ? <div className={clsx(classes.body,'StyledPaper-body')}>{children}</div> : children
      }
      {footer && (
        <StyledBox className={clsx(classes.footer,'StyledPaper-footer')}>
          {footer}
        </StyledBox>
      )}
    </Paper>
  )
}

export default React.forwardRef(StyledPaper)