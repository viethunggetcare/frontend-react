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
  useTheme,
  makeStyles,
} from '@material-ui/core';
import StyledButton from 'components/Styled/Button/Button';
import StyledBox from 'components/Styled/Box/Box';
import FileUpload from 'components/FileUpload/FileUpload';

import styles from './panelPhotoVideoUploadStyles';

const useStyles = makeStyles(styles,{ name: "PanelPhotoVideoUpload"});

const PanelPhotoVideoUpload = (props) => {   
  const {
    onFileUpload,
    onUrlUpload
  } = props;

  const classes = useStyles();
  const theme = useTheme();
  console.log(theme)
  const handleFileAdd = (files) => {
    console.log(files)
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm>
          <StickyBox>
            <FileUpload
              aspectRatio={2/1}
              accept="image/*, video/*"
              onFilesAdded={handleFileAdd}
            />
            <StyledBox marginTop={2} marginBottom={2}>
              {(propsBox) => <Typography className={classNames(propsBox.className,'Divider-element')}>Hoặc</Typography>}
            </StyledBox>
            <StyledButton
              variant="contained"
              color="primary.main"
              fullWidth
              size="large"
              onClick={onUrlUpload}
            >
              Thêm từ URL
            </StyledButton>
          </StickyBox>
        </Grid>
        <Grid item xs={12} sm="auto">
          <Hidden xsDown>
            <StyledBox height={`calc(100% + ${theme.spacing(4)}px)`} marginTop={-2}>
              {(propsBox) => <Divider className={propsBox.className} orientation="vertical"/>}
            </StyledBox>
          </Hidden>
          <Hidden smUp>
            <StyledBox width={`calc(100% + ${theme.spacing(6)}px)`} marginLeft={-3}>
              {(propsBox) => <Divider className={propsBox.className}/>}
            </StyledBox>
          </Hidden>
        </Grid>
        <Grid item xs={12} sm={6}>
          {[...Array(100).keys()].map( i => <Typography key={i}>Xem</Typography>)}
        </Grid>
      </Grid>
    </div>
  )
}

PanelPhotoVideoUpload.propTypes = {
  // title: PropTypes.string,
  onFileUpload: PropTypes.func,
  onUrlUpload: PropTypes.func,
};
PanelPhotoVideoUpload.defaultProps = {
  onFileUpload: () => {},
  onUrlUpload: () => {}
};

export default PanelPhotoVideoUpload;
