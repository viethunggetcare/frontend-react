import React from 'react'
import clsx from 'clsx';
import * as Yup from 'yup';

import { Formik } from 'formik';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import StyledButton from 'components/Styled/Button/Button'
import StyledTextField from 'components/Styled/TextField/TextField';

import styles from './linkDialogStyles'

const useStyles = makeStyles(styles,{ name: 'LinkDialog' })

const LinkDialog = (props) => {
  const { 
    open,
    helperText,
    validate,
    onClose,
    onComplete
  } = props;
  
  const formikRef = React.useRef();

  const initialValues = React.useMemo(() => {
    return {
      url: "",
    }
  },[])

  const handleClose = (ev,reason) => {
    if ( ['backdropClick'].includes(reason) ) return;
    onClose()  
  }

  const handleSubmit = (values) => {
    onClose();
    onComplete(values)
  }

  const handleValidate = async (values) => {
    const errors = {};
    const validationSchema = Yup.object().shape({
      url: Yup.string()
        .trim()
        .required('Vui lòng nhập đường dẫn')
        .url('Vui lòng nhập đúng định dạng đường dẫn'),
        // .matches(new RegExp('^https://ecom.dev.getcare.vn/$'),'loi')
    })
    await validationSchema.validate(values,{ abortEarly: false }).catch((err) => {
      for ( const innerItem of err.inner ) {
        Object.assign(errors,{[innerItem.path]: innerItem.message})
      }
    })
    if ( Object.entries(errors).length > 0 ) return errors;
    if ( validate ) {
      return await validate(values);
    }
    return {}
  }

  const classes = useStyles()
  
  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validate={handleValidate}
      onSubmit={handleSubmit}
    >
      {({ values, errors, handleChange, handleSubmit: formikHandleSubmit }) => (
        <Dialog
          open={open}
          maxWidth="sm"
          fullWidth
          onClose={() => handleClose({ isConfirmed: false })}
        >
          <DialogTitle className={classes.dialogTitle}>
            Dẫn liên kết của bạn
            <div className={clsx(classes.dialogTitleRightControls,classes.dialogTitleControls)}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            {helperText && (
              <Typography className={classes.helperText} gutterBottom>
                {helperText}
              </Typography>
            )}
            <StyledTextField
              variant="outlined"
              label="Đường dẫn"
              placeholder="https://"
              fullWidth
              name="url"
              onChange={handleChange}
              error={!!errors.url}
              helperText={errors.url}
            />
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <StyledButton onClick={handleSubmit} >
              Hủy
            </StyledButton>
            <StyledButton 
              color="primary"
              onClick={formikHandleSubmit} 
            >
              Xác nhận
            </StyledButton>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
}

LinkDialog.defaultProps = {
  open: false,
  helperText: '',
  onClose: () => {},
  onComplete: () => {},
}

export default LinkDialog;