import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';

import {
  AppBar,
  makeStyles
} from '@material-ui/core'
import StyledContainer from 'components/Styled/Container/Container';
import StyledToolbar from 'components/Styled/Toolbar/Toolbar';

import styles from './headerStyles'
import StyledTypography from 'components/Styled/Typography/Typography';

const useStyles = makeStyles(styles,{name: 'Header'})

const Header = ({ className }) => {
  const classes = useStyles();

  const headerClasses = clsx(classes.root,{
    [className]: !!className
  })

  return (
    <AppBar
      className={headerClasses}
      color="default"
    >
      <StyledContainer>
        <StyledToolbar>
          <StyledTypography variant="h6">
            LOGO
          </StyledTypography>
        </StyledToolbar>
      </StyledContainer>
    </AppBar>
  )
}

Header.propTypes = {
  className: PropTypes.string
}

export default Header;