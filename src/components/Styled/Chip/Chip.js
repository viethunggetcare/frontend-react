import React from 'react';

import clsx from 'clsx';
import { get } from 'lodash';
import { defaultTheme } from 'assets/jss/themes';

import {
  ThemeProvider, 
  createTheme,
  useTheme,
  Chip,
} from '@material-ui/core';

const muiColors = ['default','primary','secondary'];

const StyledChip = React.forwardRef((props,ref) => {
  const { 
    color,
    className,
    classes: muiClasses,
    variant,
    label,
    ...rest
  } = props;

  const currentTheme = useTheme();
  const colorCode = get(currentTheme.palette,color) || color; 

  const chipClasses = clsx({
    [className]: className,
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
      <Chip 
        classes={{ 
          ...muiClasses, 
          root: chipClasses,
        }} 
        ref={ref}
        variant={variant}
        color={muiColors.includes(color) ? color : color ? 'primary' : undefined}
        {...rest}
        label={!!label && (
          <ThemeProvider theme={createTheme(defaultTheme)}>
            {label}
          </ThemeProvider>
        )}
      />
    </ThemeProvider>
  )
});

export default StyledChip