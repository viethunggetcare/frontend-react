import React from 'react';
import clsx from 'clsx';
import { get } from 'lodash';

import {
  ThemeProvider, 
  createTheme,
  useTheme,
  LinearProgress,
  makeStyles
} from '@material-ui/core';

import styles from './linearProgressStyles';

const useStyles = makeStyles(styles,{name: 'StyledLinearProgress'});

const muiColors = ['primary','secondary'];

const StyledLinearProgress = React.forwardRef((props,ref) => {
  const { 
    color,
    bgcolor,
    height,
    rounded,
    className,
    classes: muiClasses,
    ...rest
  } = props;

  const classes = useStyles(props);
  
  const currentTheme = useTheme();
  const colorCode = get(currentTheme.palette,color) || color; 

  const chipClasses = clsx({
    [className]: className,
    [classes.root]: true,
    [classes.rounded]: !!rounded,
    [classes.customHeight]: !!height,
    [classes.bgcolor]: !!bgcolor,
    [muiClasses?.root]: true
  });
  
  const theme = createTheme({
    ...currentTheme,
    palette: {
      primary: typeof colorCode === 'string' && !muiColors.includes(color) ? {
        main: colorCode
      } : currentTheme.palette.primary
    }
  });
  
  return (
    <ThemeProvider theme={theme}>
      <LinearProgress 
        {...rest}
        classes={{ 
          ...muiClasses, 
          root: chipClasses,
          dashed: clsx({
            [classes.dashedBgcolor]: !!bgcolor,
            [muiClasses?.dashed]: !!muiClasses?.dashed
          }),
          bar: clsx({
            [classes.rounded]: !!rounded,
            [muiClasses?.bar]: !!muiClasses?.bar,
          }),
        }} 
        ref={ref}
        color={muiColors.includes(color) ? color : color ? 'primary' : undefined}
      />
    </ThemeProvider>
  )
});

StyledLinearProgress.defaultProps = {
  color: 'primary',
}

export default StyledLinearProgress