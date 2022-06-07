import React from 'react'
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import classNames from 'clsx';

import authApi from 'utils/apis/authApi';

import { Formik } from 'formik';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,  
  makeStyles,
  Typography,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import StyledButton from 'components/Styled/Button/Button';
import PanelPhotoVideoUpload from './PanelPhotoVideoUpload/PanelPhotoVideoUpload';
import PanelUrlUpload from './PanelUrlUpload/PanelUrlUpload';
import StyledBox from 'components/Styled/Box/Box';

import usePrevious from 'hooks/usePrevious';

import styles from './photoVideoUploadDialogStyles';

const useStyles = makeStyles(styles,{ name: "PhotoVideoUploadDialog"});

const PANEL_PHOTO_VIDEO_UPLOAD = 0;
const PANEL_URL_UPLOAD = 1;
const PANEL_THUMBNAIL_CROP = 2;

const PhotoVideoUploadDialog = (props) => {   
  const {  
    open,
    title,
    onClose
  } = props;

  const [panel,setPanel] = React.useState(PANEL_URL_UPLOAD);
  const [url,setUrl] = React.useState('');

  const prevPanel = usePrevious(panel);

  const formikRef = React.createRef(null);

  const classes = useStyles();

  const getDialogMaxWidth = () => {
    const maxWidthPanel = {
      [PANEL_PHOTO_VIDEO_UPLOAD]: 'md',
      [PANEL_URL_UPLOAD]: 'sm',
      [PANEL_THUMBNAIL_CROP]: 'md',
    }
    return maxWidthPanel[panel];
  }
  const getInitialValues = () => {
    return {
      url: '',
    }
  }
  const getValidationSchema = () => {
    return Yup.object().shape({
      // name: Yup.string().required(tPR('Vui lòng tên sản phẩm cần')),
      // // user_name: Yup.string().required(tPR('Vui lòng nhập tên của bạn hoặc tổ chức')),
      // quantity_number: Yup.number().nullable().required(tPR('Vui lòng nhập số lượng')),
      // deadline: Yup.string().test(
      //   'deadline',
      //   tPR('Vui lòng nhập thời gian lớn hơn ngày hiện tại'),
      //   (value) => {
      //     const deadlineValue = moment(value);
      //     const now = moment();
      //     if (
      //       value && (
      //         !deadlineValue.isValid() || 
      //         now.format("YYYY-MM-DD") >= deadlineValue.format("YYYY-MM-DD")
      //       )
      //     ) return false;
      //     return true
      //   }
      // ),
    })
  }

  const handleSubmit = (values) => {

  }

  // const handleBackToPrevPanelClick = () => {
  //   prevPanelRef.current = panel;
  //   if ( [PANEL_THUMBNAIL_CROP,PANEL_URL_UPLOAD].includes(panel) ) setPanel(PANEL_PHOTO_VIDEO_UPLOAD);
  //   setPanel()
  // }

  return (
    <Formik
      innerRef={formikRef}
      initialValues={getInitialValues()}
      validationSchema={getValidationSchema()}
      onSubmit={handleSubmit}
      validateOnChange
    >
      {
        (propsFormik) => {
          return (
            <Dialog  
              disableEscapeKeyDown
              // open={open}
              scroll="paper"
              fullWidth
              maxWidth={getDialogMaxWidth()}
              onClose={onClose}
            >
              <DialogTitle disableTypography className={classes.dialogTitle}>
                {
                  panel !== PANEL_PHOTO_VIDEO_UPLOAD && (
                    <div className={classNames(classes.dialogTitleLeftControls,classes.dialogTitleControls)}>
                      <IconButton onClick={() => setPanel(prevPanel)}>
                        <ArrowBackIcon />
                      </IconButton>
                    </div>
                  )
                }
                <StyledBox marginLeft={panel !== PANEL_PHOTO_VIDEO_UPLOAD ? 5 : 0}>
                  {propsBox => (
                    <Typography className={propsBox.className} variant="h6">
                      {panel === PANEL_PHOTO_VIDEO_UPLOAD && (
                        title || 'Tải hình ảnh hoặc video'
                      )}
                      {panel === PANEL_URL_UPLOAD && (
                        title || 'Thêm URL hình ảnh hoặc video'
                      )}
                    </Typography>
                  )}
                </StyledBox>
                <div className={classNames(classes.dialogTitleRightControls,classes.dialogTitleControls)}>
                  <IconButton onClick={onClose}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </DialogTitle>

              <DialogContent dividers className={classes.dialogContent}>
                {panel === PANEL_PHOTO_VIDEO_UPLOAD && (
                  <PanelPhotoVideoUpload
                    onUrlUpload={() => setPanel(PANEL_URL_UPLOAD)}
                  />
                )}
                {panel === PANEL_URL_UPLOAD && (
                  <PanelUrlUpload
                    onUrlUpload={() => setPanel(PANEL_URL_UPLOAD)}
                  />
                )}
              </DialogContent>

              <DialogActions>
                <StyledButton onClick={onClose}>
                  Hủy
                </StyledButton>
                <StyledButton color="primary.main">
                  Xác nhận
                </StyledButton>
              </DialogActions>
            </Dialog>
          )
        }
      }
    </Formik>
  )
}

PhotoVideoUploadDialog.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  values: PropTypes.object,
  onClose: PropTypes.func,
  onComplete: PropTypes.func,
};
PhotoVideoUploadDialog.defaultProps = {
  open: true,
  values: {},
  onClose: () => {},
  onComplete: () => {},
};

export default PhotoVideoUploadDialog;
