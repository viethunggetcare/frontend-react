import React from 'react';
import { 
  Icon,
  makeStyles  
} from '@material-ui/core';
import clsx from 'clsx';
import classNames from 'clsx';

import styles from './svgIconStyles';

const useStyles = makeStyles(styles, { name: "StyledSvgIcon" });

const svgIconAttrColors = ['action','disabled','error','inherit','primary','secondary'];
const svgIconAttrFontSizes = ['default','inherit','large','medium','small'];

const getAttr = (attr, attrs) => attrs.includes(attr) ? attr : undefined;

const StyledSvgIcon = (props,ref) => { 
  const classes = useStyles(props);

  const { 
    color,
    fontSize,
    className,
    classes: muiClasses,
    ...rest
  } = props;
  const {
    root: muiClassRoot,
    ...otherClasses
  } = muiClasses || {};
  const buttonClasses = classNames({
    [className]: className,
    [classes.root]: true,
    [classes.colorCustom]: !getAttr(color,svgIconAttrColors),
    [classes.fontSizeCustom]: !getAttr(fontSize,svgIconAttrFontSizes),
    [muiClassRoot]: true,
  });

  return (
    <Icon 
      ref={ref} 
      className={buttonClasses}
      classes={{ ...otherClasses, root: buttonClasses }} 
      color={getAttr(color,svgIconAttrColors)}
      fontSize={getAttr(fontSize,svgIconAttrFontSizes)}
      {...rest} 
    />
  )
}

export default React.forwardRef(StyledSvgIcon)