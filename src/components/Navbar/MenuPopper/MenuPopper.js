import React from 'react'

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {
  Popper,
  Grow,
  Paper,
  makeStyles
} from '@material-ui/core'

import styles from './menuPopperStyles'

const useStyles = makeStyles(styles,{name: 'MenuPopper'})

const MenuPopper = (props) => {
  const {
    children,
    onClose,
    ...rest
  } = props;

  const classes = useStyles();

  return (
    <Popper 
      {...rest} 
      disablePortal={false}
      transition 
      placement="bottom"
      className={classes.root}
      modifiers={{
        flip: {
          enabled: false,
        },
        preventOverflow: {
          enabled: true,
          boundariesElement: 'window',
        },
        offset: {
          offset: '0 13.75'
        },
        arrow: {
          enabled: true,
          // element: accountButtonRef,
        },
  
      }}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: placement }}
        >
          <div>
            <ClickAwayListener onClickAway={onClose}>
              <Paper>
                {children}
              </Paper>
            </ClickAwayListener>
          </div>
        </Grow>
      )}
    </Popper>
  )
}

export default MenuPopper;  