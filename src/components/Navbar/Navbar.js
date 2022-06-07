import React from 'react'

import {
  AppBar,
  makeStyles
} from '@material-ui/core'
import NavbarLogo from 'components/NavbarLogo/NavbarLogo';
import NavbarContainer from 'components/NavbarContainer/NavbarContainer';
import StyledBox from 'components/Styled/Box/Box';
import AccountMenu from './AccountMenu/AccountMenu';

import styles from './navbarStyles'

const useStyles = makeStyles(styles,{name: 'Navbar'})

const Navbar = (props) => {
  const { 
    onSidebarToggle
  } = props;

  const classes = useStyles();

  return (
    <AppBar
      className={classes.root}
      color="default"
      position="fixed"
    >
      <NavbarContainer>
        <NavbarLogo
          onMenuButtonClick={onSidebarToggle}
        />
        <StyledBox flexGrow={1}/>
        <AccountMenu/>
      </NavbarContainer>
    </AppBar>
  )
}

export default Navbar;