import React from 'react'
import clsx from 'clsx'

import {
  Toolbar,
  makeStyles
} from '@material-ui/core'

import styles from './navbarContainerStyles'

const useStyles = makeStyles(styles,{name: 'NavbarContainer'})

const NavbarContainer = (props) => {
  const { 
    className,
    children
  } = props;  
  const classes = useStyles();

  return (
    <Toolbar className={clsx(className,classes.root)}>
      {children}
    </Toolbar>
  )
}

export default NavbarContainer;