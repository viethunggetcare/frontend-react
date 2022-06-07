import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import {
  IconButton,
  Link,
  makeStyles
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import StyledTypography from 'components/Styled/Typography/Typography'

import styles from './navbarLogoStyles'

const useStyles = makeStyles(styles,{name: 'NavbarLogo'})

const NavbarLogo = (props) => {
  const { 
    onMenuButtonClick
  } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        onClick={onMenuButtonClick}
        edge="start"
        className={classes.menuButton}
      >
        <MenuIcon/>
      </IconButton>
      <Link underline="none" component={RouterLink} to="/">
        <div className={classes.logo}>
          <img className={classes.icon} src={''} />
          <StyledTypography variant="h6" fontWeight="bold" >
            Phahub
          </StyledTypography>
        </div>
      </Link>
    </div>
  )
}

export default NavbarLogo;