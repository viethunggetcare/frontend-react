import React from 'react';
import { get } from 'lodash';

import { 
  ThemeProvider, 
  createTheme,
  useTheme,
  makeStyles 
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';

import styles from './buttonStyles';

const useStyles = makeStyles(styles, { name: "StyledButton" });

const muiColors = ['default','inherit','primary','secondary'];

const StyledButton = (props,ref) => { 
  const { 
    color,
    className,
    classes: muiClasses,
    children,
    ...rest
  } = props;

  const classes = useStyles({ color });

  const currentTheme = useTheme();
  const colorCode = get(currentTheme.palette,color) || color; 
  
  const buttonClasses = clsx({
    [className]: !!className,
    [muiClasses?.root]: !!muiClasses?.root
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
      <Button 
        ref={ref} 
        classes={{ 
          ...muiClasses, 
          root: buttonClasses,
          containedPrimary: clsx({
            [muiClasses?.containedPrimary]: !!muiClasses?.containedPrimary,
            [classes.containedCustom]: muiColors.includes(color)
          }),
          containedSecondary: clsx({
            [muiClasses?.containedSecondary]: !!muiClasses?.containedSecondary,
            [classes.containedCustom]: muiColors.includes(color)
          }),
        }} 
        color={muiColors.includes(color) ? color : color ? 'primary' : undefined}
        {...rest} 
      >
        <ThemeProvider theme={currentTheme}>
          {children}
        </ThemeProvider>
      </Button>
    </ThemeProvider>
  )
}

export default React.forwardRef(StyledButton)