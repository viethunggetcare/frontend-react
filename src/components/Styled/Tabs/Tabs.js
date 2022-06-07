import React from 'react';
import clsx from 'clsx';
import { get } from 'lodash';

import { 
  ThemeProvider, 
  createTheme,
  useTheme,
  Tabs,
  makeStyles,
} from '@material-ui/core';

import styles from './tabStyles';

const useStyles = makeStyles(styles,{name: 'StyledTabs'});

const muiTextColors = ['inherit','primary','secondary'];
const muiIndicatorColors = ['primary','secondary'];

const StyledTabs = React.forwardRef((props,ref) => {
  const { 
    color,
    textColor,
    indicatorColor,
    className,
    classes: muiClasses,
    children,
    ...rest
  } = props;
  
  const currentTheme = useTheme();
  
  const indicatorColorCode = get(currentTheme.palette,indicatorColor) || indicatorColor; 
  const textColorCode = get(currentTheme.palette,textColor) || textColor; 

  const classes = useStyles();

  const tabsClasses = clsx({
    [className]: className,
    [muiClasses?.root]: !!muiClasses?.root,
    [classes.root]: true
  });

  const theme = createTheme({
    ...currentTheme,
    palette: {
      primary: typeof indicatorColorCode === 'string' && !muiIndicatorColors.includes(indicatorColorCode) ? {
        main: indicatorColorCode
      } : currentTheme.palette.primary,
      secondary: typeof textColorCode === 'string' && !muiTextColors.includes(textColorCode) ? {
        main: textColorCode
      } : currentTheme.palette.secondary
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Tabs 
        {...rest}
        classes={{ 
          ...muiClasses, 
          root: tabsClasses,
          scrollButtons: clsx({
            [muiClasses?.scrollButtons]: !!muiClasses?.scrollButtons,
            [classes.scrollButtons]: true
          }),
          indicator: clsx({
            [muiClasses?.indicator]: !!muiClasses?.indicator,
            [classes.indicator]: true
          }),
        }} 
        ref={ref}
        indicatorColor={muiIndicatorColors.includes(indicatorColor) ? indicatorColor : 'primary'}
        textColor={muiTextColors.includes(textColor) ? textColor : textColor ? 'secondary' : 'inherit'}
      >
        {children}
      </Tabs>
    </ThemeProvider>
  )
})

export default StyledTabs