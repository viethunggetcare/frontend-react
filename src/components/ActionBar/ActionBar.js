import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Link as RouterLink } from 'react-router-dom'
import { isEqual } from 'lodash'

import { LOGO_IMAGE, LOGO_PHAHUB_IMAGE } from 'utils/constants/assetConstants'

import {
  AppBar,
  IconButton,
  Link,
  Toolbar,
  Slide,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Breadcrumbs,
  useScrollTrigger,
  CircularProgress,
  Hidden,
  makeStyles
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MenuIcon from '@material-ui/icons/Menu'
import NavbarLogo from 'components/NavbarLogo/NavbarLogo';
import NavbarContainer from 'components/NavbarContainer/NavbarContainer';
import StyledTypography from 'components/Styled/Typography/Typography'
import StyledBox from 'components/Styled/Box/Box';
import StyledButton from 'components/Styled/Button/Button';
import StyledSvgIcon from 'components/Styled/SvgIcon/SvgIcon'
// import AccountMenu from './AccountMenu/AccountMenu';

import styles from './actionBarStyles'

const useStyles = makeStyles(styles,{name: 'ActionBar'})

const ActionMenu = (props) => {
  const { actions, maxQuantityKeepOutside } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuToggle = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const keptOutsideActions = !!maxQuantityKeepOutside ? actions.filter(act => !!act.keepOutside).slice(0,maxQuantityKeepOutside) : actions;
  const dropboxActions = keptOutsideActions.length !== actions.length ? actions.filter((act,actIndex) => {
    return !keptOutsideActions.some((kOAct,kOActIndex) => isEqual(kOAct,act));
  }) : [];
  
  const classes = useStyles();
  
  return (
    <>
      {dropboxActions.length > 0 && (
        <>
          <IconButton onClick={handleMenuToggle} >
            <MoreVertIcon fontSize="inherit" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}        
            keepMounted
            open={open}
            onClose={handleMenuClose}
          >
            {dropboxActions.map((act,actIndex) => (
              <MenuItem 
                key={actIndex} 
                disabled={act.loading || act.disabled}
                onClick={act.onClick}
              >
                <ListItemIcon className={classes.actionListItemIcon}>
                {act.loading ? (
                  <CircularProgress size={20} />
                ) : !!act.iconComponent ? (
                  <StyledSvgIcon fontSize="small" component={act.iconComponent}/>
                ) : ''}
                </ListItemIcon>
                {act.text}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
      {keptOutsideActions.map((act,actIndex) => (
        <StyledButton
          key={actIndex}
          variant="contained"
          color="primary.main"
          {...act.buttonProps}
          size="medium"
          // startIcon={act.loading ? <CircularProgress size={20} /> : act.iconComponent ? <StyledSvgIcon component={act.iconComponent}/> : undefined}
          disabled={act.loading || act.disabled}
          onClick={act.onClick}
        >
          {act.text}
        </StyledButton>
      ))}
    </>
  )
}

const actionPropTypes = PropTypes.arrayOf(PropTypes.shape({
  keepOutside: PropTypes.bool,
  loading: PropTypes.bool,
  iconComponent: PropTypes.element,
  text: PropTypes.string,
  buttonProps: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}))

ActionMenu.propTypes = {
  maxQuantityKeepOutside: PropTypes.number,
  actions: actionPropTypes
}

const ActionBar = (props) => {
  const { 
    title,
    breadcrumbs,
    actions,
  } = props;

  const classes = useStyles();

  const [isScrolledToTop,setIsScrolledToTop] = React.useState(true)  
  const hasBreadcrumb = Array.isArray(breadcrumbs) && breadcrumbs.length > 0;

  const handleWindowScroll = (e) => {
    setIsScrolledToTop(window.scrollY <= 32 + (hasBreadcrumb ? 24 : 0))
  }

  React.useEffect(() => {
    window.addEventListener('scroll',handleWindowScroll)
    return () => {
      window.removeEventListener('scroll',handleWindowScroll);
    }
  },[])

  const renderActions = (actProps) => {
    
  }

  return (
    <>
      {hasBreadcrumb && (
        <Breadcrumbs >
          {breadcrumbs.map((breadcrumb,bIndex) => (
            !!breadcrumb.to ? (
              <Link underline="none" key={bIndex} color="primary" component={RouterLink} to={breadcrumb.to}>
                {breadcrumb.text}
              </Link>
            ) : (
              <StyledTypography key={bIndex} color="primary">
                {breadcrumb.text}
              </StyledTypography>
            )
          ))}
        </Breadcrumbs>
      )} 
      
      <AppBar
        className={clsx(classes.appBar,{[classes.appBarSticky]: !isScrolledToTop })}
        color="transparent"
        position="sticky"
      >
        <Toolbar>
          <StyledTypography variant="h6">{title}</StyledTypography>
          <StyledBox flexGrow={1}/>
          {(Array.isArray(actions) && actions.length > 0) && (
            <StyledBox display="flex" alignItems="center" justifyContent="center" gap={1}>
              <Hidden mdUp> 
                <ActionMenu
                  actions={actions}
                  maxQuantityKeepOutside={1}
                />
              </Hidden>
              <Hidden smDown lgUp>
                <ActionMenu
                  actions={actions}
                  maxQuantityKeepOutside={1}
                />
              </Hidden>
              <Hidden mdDown>
                <ActionMenu actions={actions}/>
              </Hidden>
            </StyledBox>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

ActionBar.propTypes = {
  title: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    to: PropTypes.string, // url
  })),
  actions: actionPropTypes
}

export default ActionBar;