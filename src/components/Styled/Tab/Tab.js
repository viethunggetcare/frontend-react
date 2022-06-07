import React from 'react';
import clsx from 'clsx';

import { defaultTheme } from 'assets/jss/themes';

import { 
  ThemeProvider, 
  createTheme,
  Tab,
  makeStyles,
} from '@material-ui/core';

import styles from './tabStyles';

const useStyles = makeStyles(styles,{name: 'StyledTab'});

const StyledTab = React.forwardRef((props,ref) => {
  const { 
    className,
    classes: muiClasses,
    children,
    label,
    ...rest
  } = props;

  const classes = useStyles();

  const tabClasses = clsx({
    [className]: className,
    [muiClasses?.root]: !!muiClasses?.root,
    [classes.root]: true
  });
  const theme = createTheme(defaultTheme);
  
  return (
    <Tab 
      {...rest}
      classes={{ 
        ...muiClasses, 
        root: tabClasses,
        textColorPrimary: clsx({
          [muiClasses?.textColorPrimary]: !!muiClasses?.textColorPrimary,
          [classes.textColorPrimary]: true
        }),
        textColorSecondary: clsx({
          [muiClasses?.textColorSecondary]: !!muiClasses?.textColorSecondary,
          [classes.textColorSecondary]: true
        }),
        selected: clsx({
          [muiClasses?.selected]: !!muiClasses?.selected,
          [classes.selected]: true
        })
      }} 
      label={!!label && (
        <ThemeProvider theme={theme}>
          {label}
        </ThemeProvider>
      )}
      ref={ref}
    >
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </Tab>
  )
})

export default StyledTab