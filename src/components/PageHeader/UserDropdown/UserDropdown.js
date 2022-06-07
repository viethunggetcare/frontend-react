import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from "reselect";
import { makeSelectLoginUser } from 'redux/selectors';
import { signOut } from 'redux/actions/authActions';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import { makeStyles } from '@material-ui/core/styles';
import Keycloak from 'keycloak-js';

const Config = {
  url: `${process.env.REACT_APP_PATH_KEYCLOAK}`,
  realm: `${process.env.REACT_APP_PATH_REALM}`,
  clientId: `${process.env.REACT_APP_PATH_CLIENT_ID}`,
  onLoad: `${process.env.REACT_APP_PATH_ONLOAD}`,
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  avatar: {
    width: '1.5rem',
    height: '1.5rem',
  },
  name: {
    padding: '0 0.5rem',
    userSelect: 'none',
  },
  poper: {
    zIndex: 1,
  },
}));

function UserDropdown(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleSignOut = async (event) => {
    await loginKeyCloak();
    await handleClose(event);
    await props.signOut()
   }
 
   const loginKeyCloak = () => {
     let keycloak = Keycloak(Config);
     keycloak.init({
       onLoad: 'check-sso',
       checkLoginIframe: true,
       silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
       responseMode: 'query',
     })
       .then(async (authenticated) => {
         if (authenticated) {
           keycloak.logout();
         }
       }) 
   };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      setOpen(false);
    }
  }

  const handleGoToMyProfile = (e) => {
    setOpen(false);
    props.onGoToPage(`/myprofile/changepassword`);
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.user}
      >
        <Avatar alt="Profile Name" src={props.user.avatar || null} className={classes.avatar}/>
          <span className={classes.name}>{ props.user.name }</span>
        <ArrowDropDownRoundedIcon style={{ color: '#ffffff' }} />
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-end"
        style={{
          minWidth: anchorRef && anchorRef.current && anchorRef.current.offsetWidth,
          marginTop: '0.25rem',
          zIndex: 3,
        }}
        className={classes.poper}
      >
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleGoToMyProfile}>
                    <ListItemIcon style={{minWidth: '32px'}}><LockOutlinedIcon fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Đổi mật khẩu" />
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleSignOut}>
                    <ListItemIcon style={{minWidth: '32px'}}><PowerSettingsNewIcon fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Đăng xuất" />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectLoginUser(),
});
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: (payload) => dispatch(signOut(payload)),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(UserDropdown);
