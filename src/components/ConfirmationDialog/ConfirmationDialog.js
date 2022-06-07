import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import classes from './ConfirmationDialog.module.scss';

class ConfirmationDialog extends PureComponent {
  render() {
    const { isOpen, isLoading, title, message, type, dialogAction } = this.props;

    return (
      <Dialog
        open={isOpen}
        onClose={this.props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.Dialog}
      >
        <div className={`${classes.DialogContentWrap} ${isLoading && 'OverlayLoading'}`}>
          { type === 'info' &&
            <div className={classes.DialogInfo}>
              <ErrorOutlineIcon className={classes.DialogInfoIcon}/>
              <h4 className={classes.DialogInfoTitle}>{ title }</h4>
              <p>{ message }</p>
              <div className={classes.DialogInfoActions}>
                { dialogAction }
              </div>
            </div>
          }
          { type === 'normal' &&
            <>
              <DialogTitle className={classes.DialogTitle}>
                { title }
              </DialogTitle>
              <DialogContent className={classes.DialogContent}>
                { message }
              </DialogContent>
              <DialogActions className={classes.DialogFooter}>
                <Button onClick={this.props.onClose}>
                  Huỷ bỏ
                </Button>
                <Button
                  onClick={this.props.onSubmit}
                  variant="contained"
                  color="primary"
                >
                  Xác nhận
                </Button>
              </DialogActions>
            </>
          }
        </div>
      </Dialog>
    );
  }
}

ConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  type: PropTypes.oneOf(['normal', 'info']),
  dialogAction: PropTypes.element,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

ConfirmationDialog.defaultProps = {
  isOpen: false,
  isLoading: false,
  title: '',
  message: '',
  type: 'normal',
};

export default ConfirmationDialog;
