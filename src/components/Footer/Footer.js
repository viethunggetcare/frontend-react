import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core';
import StyledContainer from 'components/Styled/Container/Container';

import styles from './footerStyles';
import StyledTypography from 'components/Styled/Typography/Typography';

const useStyles = makeStyles(styles, { name: 'Footer' });

const Footer = ({ className }) => {
  const classes = useStyles();

  const footerClasses = clsx(classes.root,{
    [className]: !!className
  })

  return (
    <div className={footerClasses}>
      <StyledContainer>
        Footer
        <StyledTypography variant="h6">Footer</StyledTypography>
      </StyledContainer>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
}

export default Footer;
