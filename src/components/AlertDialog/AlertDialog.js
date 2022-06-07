import React from 'react'

import eventBus from 'utils/services/eventBusService';
import { ALERT_DIALOG } from 'utils/constants/eventBusConstants';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  withStyles,
} from '@material-ui/core';
import StyledButton from 'components/Styled/Button/Button'

import styles from './alertDialogStyles'

const confirmButtonPropsConstants = {
  show: true,
  text: "Ok",
  color: "primary",
  variant: undefined,
};
const cancelButtonPropsConstants = {
  show: false,
  text: "Cancel",
  color: "default",
  variant: undefined,
};
let resolve = null;
let reject = null;

const AlertDialog = (props) => {
  const { classes } = props;
  const [open,setOpen] = React.useState(false);
  const [options,setOptions] = React.useState({
    title: '',
    content: '',
    actions: null,
    confirmButtonProps: { ... confirmButtonPropsConstants },
    cancelButtonProps: { ... cancelButtonPropsConstants },
  });
  const { 
    title, 
    content, 
    actions, 
    confirmButtonProps: {
      text: confirmButtonPropsText,
      show: confirmButtonPropsShow,
      ...otherConfirmButtonProps
    },
    cancelButtonProps: {
      text: cancelButtonPropsText,
      show: cancelButtonPropsShow,
      ...otherCancelButtonProps
    }
  } = options;

  const handleClose = (params) => {
    setOpen(false)
    resolve && resolve(params)
    removePromiseMethod()
  };
  const removePromiseMethod = () => {
    resolve = null;
    reject = null;
  }

  React.useEffect(() => {
    eventBus.on(ALERT_DIALOG,(data, resolveFromPromise, rejectFromPromise) => {
      resolve = resolveFromPromise
      reject = rejectFromPromise
      setOptions({
        ...options,
        ...data,
        confirmButtonProps: {
          ...confirmButtonPropsConstants,
          ...data?.confirmButtonProps
        },
        cancelButtonProps: {
          ...cancelButtonPropsConstants,
          ...data?.cancelButtonProps
        }
      })
      setOpen(true)
    })
    return () => {
      eventBus.remove(ALERT_DIALOG)
      removePromiseMethod()
    }
  },[])
  
  return (
    <Dialog
      open={open}
      maxWidth="sm"
      onClose={() => handleClose({ isConfirmed: false })}
    >
      {
        ![null,undefined,''].includes(title) && <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>
      }
      { ![null,undefined,''].includes(content) && (
        <DialogContent className={classes.dialogContent}>
          { content }
        </DialogContent>
      )}
      <DialogActions className={classes.dialogActions}>
        {
          Array.isArray(actions) ? (
            actions.map( action => (
              <StyledButton onClick={() => handleClose({ payload: action.payload, name: action.name })} color="primary" autoFocus>
                { action.text } 
              </StyledButton>
            ))
          ) : actions ? (
            actions
          ) : <>
            {
              cancelButtonPropsShow && (
                <StyledButton 
                  {...otherCancelButtonProps}
                  onClick={() => handleClose({ isConfirmed: false })} 
                >
                  { cancelButtonPropsText }
                </StyledButton>
              )
            }
            {
              confirmButtonPropsShow && (
                <StyledButton 
                  {...otherConfirmButtonProps}
                  onClick={() => handleClose({ isConfirmed: true })} 
                >
                  { confirmButtonPropsText }
                </StyledButton>
              )
            }
          </>
        }
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles,{ name: "AlertDialog" })(React.memo(AlertDialog));