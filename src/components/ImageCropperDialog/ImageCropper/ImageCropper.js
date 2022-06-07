import React from 'react'
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

import Cropper from "react-cropper";
import {
  Typography,
  makeStyles,
} from '@material-ui/core';
import StyledBox from 'components/Styled/Box/Box';

import styles from './imageCropperStyles';

const useStyles = makeStyles(styles,{ name: 'ImageCropper' })

const MemoCropper = React.memo(Cropper,(prevProps, nextProps) => {
  return isEqual(prevProps,nextProps);
});

const ImageCropper = React.forwardRef((props,ref) => {
  const {
    src: controlledSrc,
    aspectRatio
  } = props;
  const classes = useStyles();
  const [src,setSrc] = React.useState(null);
  const [minCropBoxWidth,setMinCropBoxWidth] = React.useState(100);
  const [minCropBoxHeight,setMinCropBoxHeight] = React.useState(100);
  const [croppedSize,setCroppedSize] = React.useState({
    width: 0,
    height: 0
  });

  const cropperRef = React.useRef();

  const handleCrop = React.useCallback((e) => {
    setCroppedSize({
      width: Math.round(e.detail.width),
      height: Math.round(e.detail.height),
    })
  },[setCroppedSize]);

  React.useEffect(() => {
    setSrc(controlledSrc);
  },[controlledSrc])

  React.useImperativeHandle(ref, () => ({
    cropper: cropperRef?.current?.cropper
  }));

  // const handleReady = () => {
  //   const imageElement = cropperRef?.current;
  //   const cropper = imageElement?.cropper;
  // }
  return (
    <div ref={ref} className={classes.root}>
      <div className={classes.imageCrop}>
        <div className={classes.imageCropContent}>
          <MemoCropper
            ref={cropperRef}
            center
            cropBoxResizable
            style={{ height: '100%', width: "100%", margin: "0 auto" }}
            zoomable={false}
            aspectRatio={aspectRatio}
            src={src}
            viewMode={2}
            minCropBoxWidth={minCropBoxWidth}
            minCropBoxHeight={minCropBoxHeight}
            background={false}
            autoCropArea={1}
            checkOrientation={true}
            restore
            guides
            responsive
            crop={handleCrop}
            // ready={handleReady}
          />
        </div>
      </div>
      <Typography className={classes.typography}>
        Kích thước hình ảnh sau khi cắt: <StyledBox color="primary.main" component="span">{croppedSize.width}px * {croppedSize.height}px</StyledBox>
      </Typography>
    </div>
  )
})

ImageCropper.propTypes = {
  src: PropTypes.string,
  aspectRatio: PropTypes.number,
}

ImageCropper.defaultProps = {
  src: "",
  aspectRatio: NaN,
}

export default ImageCropper;