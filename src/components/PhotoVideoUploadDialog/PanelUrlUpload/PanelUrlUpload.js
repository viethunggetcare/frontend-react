import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'clsx';

import authApi from 'utils/apis/authApi';

import StickyBox from "react-sticky-box";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,  
  Divider,
  Grid,
  Typography,
  Hidden,
  InputAdornment,
  useTheme,
  // makeStyles,
} from '@material-ui/core';
import StyledButton from 'components/Styled/Button/Button';
import StyledBox from 'components/Styled/Box/Box';
import FileUpload from 'components/FileUpload/FileUpload';
import StyledTextField from 'components/Styled/TextField/TextField';

// import styles from './panelPhotoVideoUploadStyles';

// const useStyles = makeStyles(styles,{ name: "PanelUrlVideoUpload"});

const PanelUrlVideoUpload = (props) => {   
  return (
    <div>
      <StyledTextField
        label="Dán URL video/hình ảnh"
        variant="outlined"
        placeholder="https://"
        // InputProps={{
        //   startAdornment: <InputAdornment position="start">https://</InputAdornment>,
        // }}
        fullWidth
      />
    </div>
  )
}

PanelUrlVideoUpload.propTypes = {
  // title: PropTypes.string,
  // onFileUpload: PropTypes.func,
  // onUrlUpload: PropTypes.func,
};
PanelUrlVideoUpload.defaultProps = {
  // onFileUpload: () => {},
  // onUrlUpload: () => {}
};

export default PanelUrlVideoUpload;
