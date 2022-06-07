import React from 'react';
import { withStyles  } from '@material-ui/core/styles';
import Slider from 'react-slick'
import {
  ButtonBase
} from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const styles = (theme) => {
  return {
    slickArrow: {
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
    },
    slickArrowRight: {
      right: 0,
    },
    slickArrowLeft: {
      left: 0,
    },
    slickArrowCircle: {
      backgroundColor: "#FFF",
      borderRadius: "50%",
      display: "flex !important",
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(1),
      boxShadow: theme.shadows[1],
      width: 'fit-content',
      "&$slickArrowRight": {
        right: -24,
      },
      "&$slickArrowLeft": {
        left: -24,
      },
    } 
  }
};

const SlickArrow = ({ classes, _arrowType, _arrowVariant, currentSlide, slideCount, ...otherProps }) => {
  const arrowClasses = {
    'prev': `${classes.slickArrowLeft} Slider-slickArrow-prev`,
    'next': `${classes.slickArrowRight} Slider-slickArrow-next`,
  }
  const arrowIcons = {
    'prev': <KeyboardArrowLeftIcon/>,
    'next': <KeyboardArrowRightIcon/>,
  }
  const arrowVariantClasses = {
    'circle': classes.slickArrowCircle,
  }
  return <ButtonBase
    {...otherProps}
    className={
      `${classes.slickArrow} Slider-slickArrow
      ${arrowClasses[_arrowType] || arrowClasses['prev']} 
      ${arrowVariantClasses[_arrowVariant] || arrowVariantClasses['circle']}` +
      (currentSlide === slideCount - 1 ? ' slick-disabled' : '')
    }
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1 ? true : false}
    type="button"
  >
    { arrowIcons[_arrowType] || arrowIcons[0] }
  </ButtonBase>
}


const StyledSlider = withStyles(styles)(({ classes, className, _arrowVariant, ...otherProps}) => {
  const PrevArrow = <SlickArrow classes={classes} _arrowType="prev" _arrowVariant={_arrowVariant}/>;
  const NextArrow = <SlickArrow classes={classes} _arrowType="next" _arrowVariant={_arrowVariant}/>;

  return <Slider 
    {...otherProps}
    className={`${classes.root} ${className}`} 
    prevArrow={PrevArrow}
    nextArrow={NextArrow}
  />
});


export default React.forwardRef( ({ ...other }, ref) =>
  <StyledSlider ref={ref} {...other} />
)