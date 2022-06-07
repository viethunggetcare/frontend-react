import React from 'react';
import clsx from 'clsx';
import { get } from 'lodash';

import {
  ThemeProvider, 
  createTheme,
  useTheme,
  Typography,
  Tooltip,
  makeStyles,
} from '@material-ui/core';

import styles from './typographyStyles';

const useStyles = makeStyles(styles,{name: 'StyledTypography'});

const muiColors = ['initial','inherit','default','primary','secondary','textPrimary','textSecondary','error'];

const StyledTypography = React.forwardRef((props,ref) => {
  const { 
    fontWeight,
    fontSize,
    marginBottom,
    color,
    maxWidth,
    width,
    enableTextOverflowTooltip,
    textOverflowLinesToShow,
    height,
    className,
    classes: muiClasses,
    children,
    name,
    ...rest
  } = props;

  const [tooltipTitle,setTooltipTitle] = React.useState('')
  const [tooltipOpen,setTooltipOpen] = React.useState(false)
  const [tooltipDisabled,setTooltipDisabled] = React.useState(true)
  const [typographyStyles,setTypographyStyles] = React.useState({})

  const typographyRef = React.useRef();

  const currentTheme = useTheme();
  const colorCode = get(currentTheme.palette,color) || color; 

  const classes = useStyles(props);

  const typographyClasses = clsx({
    [className]: className,
    [muiClasses?.root]: !!muiClasses?.root,
    [classes.fontSize]: !!fontSize,
    [classes.fontWeight]: !!fontWeight,
    [classes.maxWidth]: !!maxWidth,
    [classes.textOverflow]: !!enableTextOverflowTooltip && (!!maxWidth || !!width)
  });

  const theme = createTheme({
    ...currentTheme,
    palette: {
      primary: typeof colorCode === 'string' && !muiColors.includes(color) ? {
        main: colorCode
      } : currentTheme.palette.primary
    }
  });

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  }

  const handleTooltipOpen = () => {
    if (!tooltipDisabled) {
      setTooltipOpen(true);
    }
  }

  React.useEffect(() => {
    if ( !!enableTextOverflowTooltip && (!!maxWidth || !!width) ) {
      setTooltipTitle(typographyRef.current.textContent)
      const resizeObserverTypography = new ResizeObserver(() => {
        if ( typographyRef.current ) {
          if ( typographyRef.current.scrollHeight <= typographyRef.current.offsetHeight ) {
            setTooltipOpen(false)
            setTooltipDisabled(true)
            setTypographyStyles((prevTypographyStyles) => ({
              ...prevTypographyStyles,
              textAlign: null,
            }))
          } else {
            setTooltipDisabled(false)
            setTypographyStyles((prevTypographyStyles) => ({
              ...prevTypographyStyles,
              textAlign: 'left',
            }))
          };
        }
      });
      resizeObserverTypography.observe(typographyRef.current);
    }
  },[children,enableTextOverflowTooltip,maxWidth,width])

  React.useEffect(() => {
    setTypographyStyles((prevTypographyStyles) => ({
      ...prevTypographyStyles,
      ['--webkit-line-clamp']: textOverflowLinesToShow
    }))
  },[textOverflowLinesToShow])
  
  return (
    <ThemeProvider theme={theme}>
      <Tooltip title={tooltipTitle} open={tooltipOpen} onClose={handleTooltipClose} onOpen={handleTooltipOpen} >
        <Typography
          {...rest}
          classes={{ 
            ...muiClasses, 
            root: typographyClasses,
          }} 
          color={muiColors.includes(color) ? color : color ? 'primary' : undefined}
          ref={(elRef) => {
            if (ref?.current) ref.current = elRef;
            typographyRef.current = elRef;
          }}
          style={typographyStyles}
        >
          <ThemeProvider theme={currentTheme}>
            {children}
          </ThemeProvider>
        </Typography>
      </Tooltip>
    </ThemeProvider>
  )
})

export default StyledTypography;
