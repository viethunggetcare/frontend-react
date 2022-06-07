import React from 'react'
import classNames from 'clsx';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import StyledButton from 'components/Styled/Button/Button'
import StyledBox from 'components/Styled/Box/Box';
import LoadingOverlay from 'components/LoadingOverlay/LoadingOverlay';
import ImageCropper from './ImageCropper/ImageCropper';

import useUploadFiles from 'hooks/useUploadFiles'

import styles from './imageCropperDialogStyles'

const useStyles = makeStyles(styles,{ name: 'ImageCropDialog' })

const ImageCropperDialog = (props) => {
  const { 
    open,
    autoUpload,
    src,
    aspectRatio,
    onClose,
    onComplete
  } = props;
  const [loading,setLoading] = React.useState(false);
  const [fileName,setFileName] = React.useState("");

  const imageCropperRef = React.useRef();

  const uploadFile = useUploadFiles({
    onUploadComplete: async (files) => {
      setLoading(false);
      const url = files[0].url;
      onComplete(url);
      onClose();
    }
  });
  
  const classes = useStyles();

  const formatAspectRatio = React.useMemo(() => {
    if ( typeof aspectRatio === 'string' ) {
      const aspectRatioArr = aspectRatio.split(':');
      return aspectRatioArr[0]/aspectRatioArr[1];
    }
    return aspectRatio;
  },[aspectRatio])

  const handleClose = (ev,reason) => {
    if ( ['backdropClick'].includes(reason) ) return;
    onClose()  
  }

  const handleSubmit = () => {
    setLoading(true)
    const cropper = imageCropperRef.current?.cropper;
    const canvas = cropper.getCroppedCanvas();
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          setLoading(false)
          return;
        }
        blob.name = fileName;
        if ( !autoUpload ) {
          onComplete(URL.createObjectURL(blob))
          setLoading(false)
          return
        }
        uploadFile.handleFilesUpload([blob]);
      },
      'image/jpeg',
      1
    );
  }

  React.useEffect(() => {
    setFileName(src.split("/")[src.split("/").length - 1])
  },[src])
  
  return (
    <Dialog
      classes={{
        paper: classes.dialogPaper
      }}
      disableEscapeKeyDown
      open={open}
      maxWidth="md"
      fullWidth
      onClose={handleClose}
    >
      <DialogTitle className={classes.dialogTitle}>
        Chỉnh sửa hình ảnh
        <div className={classNames(classes.dialogTitleRightControls,classes.dialogTitleControls)}>
          <IconButton disabled={loading} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <StyledBox position="relative" flex={1}>
          <div className={classes.wrapper}>
            {/* hint... */}
            <StyledBox position="relative" flex={1} component={LoadingOverlay} loading={loading}>
              <StyledBox position="absolute" top="0" left="0" width="100%" height="100%">
                <ImageCropper
                  ref={imageCropperRef}
                  src={src}
                  aspectRatio={formatAspectRatio}
                />
              </StyledBox>
            </StyledBox>
          </div>
        </StyledBox>
      </DialogContent>
      <DialogActions>
        <StyledButton 
          disabled={loading}
          onClick={handleClose} 
        >
          Hủy
        </StyledButton>
        <StyledButton 
          color="primary"
          disabled={loading}
          onClick={handleSubmit}
        >
          Xác nhận
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
}

ImageCropperDialog.defaultProps = {
  open: false,
  src: "",
  aspectRatio: NaN,
  autoUpload: false,
  onClose: () => {},
  onComplete: () => {},
}

export default React.memo(ImageCropperDialog);