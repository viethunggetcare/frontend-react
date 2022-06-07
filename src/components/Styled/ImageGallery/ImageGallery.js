import React from 'react';
import { withStyles  } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import ImageGallery from 'react-image-gallery';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const getAspectRatio = (aspectRatio) => {
  if ( typeof aspectRatio === 'string' ) {
    const aspectRatioArray = aspectRatio.split(":");
    return Number(aspectRatioArray[1])/Number(aspectRatioArray[0])
  }
  return 1;
}

const styles = (theme) => {
  return {
    root: ({ _aspectRatio }) => {
      const imageGalleryThumbnailFullscreenWidth = 100;
      const imageGalleryThumbnailPaddingTop = theme.spacing(2);
      const imageGalleryThumbnailPaddingBottom = theme.spacing(2);
      return {
        "& .image-gallery": {
          "& .image-gallery-content": {
            "& .image-gallery-slide-wrapper": {
              width: "100%",
              paddingTop: `calc(${getAspectRatio(_aspectRatio)} * 100%)`,
              "& .image-gallery-right-nav,& .image-gallery-left-nav": {
                // display: "none",
                padding: theme.spacing(2,0),
                background: 'rgba(0, 0, 0, 0.25)',
                '& .MuiSvgIcon-root': {
                  color: '#FFF',
                  fontSize: 42,
                }
              },
              "& .image-gallery-icon": {
                display: "none",
                "&:hover": {
                  color: "#FFF",
                }
              },
              "& .image-gallery-fullscreen-button": {
                padding: theme.spacing(2),
              },
              "& .image-gallery-swipe": {
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                width: "100%",
                height: "100%",
                "& .image-gallery-slides": {
                  width: "100%",
                  height: "100%",
                  "& .image-gallery-slide": {
                    height: "100%",
                    "& .image-gallery-image": {
                      width: "100%",
                      height: "100%",
                      maxHeight: "unset",
                    }
                  },
                }
              },
              "& >.image-gallery-slides": {
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                width: "100%",
                height: "100%",
                "& .image-gallery-slide": {
                  width: "100%",
                  height: "100%",
                  "& .image-gallery-image": {
                    width: "100%",
                    height: "100%",
                    maxHeight: "unset",
                  },
                }
              },
            },
            "& .image-gallery-thumbnails": {
              paddingTop: imageGalleryThumbnailPaddingTop,
              paddingBottom: 0,
              "& .image-gallery-thumbnails-container": {
                textAlign: "start",
                "& .image-gallery-thumbnail": {
                  width: `calc(100% / 5 - 2px)`,
                  position: "relative",
                  border: `2px solid ${theme.palette.divider}`,
                  "&.active, &:focus, &:hover": {
                    borderColor: theme.palette.primary.main,
                    borderWidth: 2,
                  },
                  "& .image-gallery-thumbnail-inner": {
                    width: "100%",
                    paddingTop: "100%",
                    position: "relative",
                    "& .image-gallery-thumbnail-image": {
                      width: "100%",
                      height: "100%",
                      objectFit: "contain !important",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }
                  }
                }
              },
            },
            "&.fullscreen": {
              "& .image-gallery-slide-wrapper": {
                paddingTop: `calc(100vh - ${imageGalleryThumbnailPaddingTop + imageGalleryThumbnailPaddingBottom + imageGalleryThumbnailFullscreenWidth}px)`
              },
              "& .image-gallery-thumbnails-container": {
                textAlign: 'center !important',
                "& .image-gallery-thumbnail": {
                  width: `${imageGalleryThumbnailFullscreenWidth}px !important`,
                },
              }
            }
          },
          "&:hover .image-gallery-icon": {
            display: "flex !important",
          },
        }
      }
    }
  }
};

const NavButton = ({ align, ...otherProps }) => {
  const arrowIcons = {
    'left': <KeyboardArrowLeftIcon/>,
    'right': <KeyboardArrowRightIcon/>,
  }
  return <ButtonBase
    className={`image-gallery-icon image-gallery-${align}-nav`}
    {...otherProps}
  >
    { arrowIcons[align] || arrowIcons[0] }
  </ButtonBase>
}
 
const StyledImageGallery = withStyles(styles)(({ classes, _aspectRatio,...otherProps }) => {
  return <div className={classes.root}>
    <ImageGallery 
      renderRightNav={(onClick, disabled) => <NavButton align="right" onClick={onClick} disabled={disabled}/>}
      renderLeftNav={(onClick, disabled) => <NavButton align="left" onClick={onClick} disabled={disabled}/>}
      {...otherProps}
    />
  </div>
});

// const sTab = ({ classes, innerRef, color, ...other }) => {
//   return <Tab classes={{ root: classes.root }} {...other} />
// }

// export default withStyles(styles)(sTab);

export default React.forwardRef( ({ ...otherProps }, ref) =>
  <StyledImageGallery ref={ref} {...otherProps} />
)