import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { signOut } from 'redux/actions/authActions'
import { bindActionToPromise } from 'utils/helpers'

import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  makeStyles
} from '@material-ui/core'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import StyledButton from 'components/Styled/Button/Button'
import NavBarMenuPopper from 'components/Navbar/MenuPopper/MenuPopper'

import styles from './accountMenuStyles'

const useStyles = makeStyles(styles,{name: 'AccountMenu'})

const AccountMenu = (props) => {
  const {
    user, 
    signOut
  } = props;
  const [menuOpen,setMenuOpen] = React.useState(false);

  const accountButtonRef = React.useRef();

  const classes = useStyles();

  return (
    <div>
      <StyledButton
        ref={accountButtonRef}
        className={classes.accountButton}
        onClick={() => {
          console.log(!menuOpen)
          setMenuOpen(!menuOpen)
        }}
      >
        <Avatar
          className={classes.avatar}
          src={user?.avatar}
        >{user?.name ? user?.name.charAt(user?.name.length - 1) : ""}</Avatar>
        {user?.name}
      </StyledButton>
      <NavBarMenuPopper
        open={menuOpen} 
        anchorEl={accountButtonRef.current} 
        onClose={() => setMenuOpen(false)}
      >
        <List disablePadding>
          <ListItem 
            className={classes.listItem} 
            component="a" 
            href={`${process.env.REACT_APP_PATH_ECOM}user/account/profile`} 
            target="_blank"
          >
            <AccountCircleOutlinedIcon className={classes.icon}/>
            <ListItemText className={classes.listItemText} dense primary="Hồ sơ của tôi" />
          </ListItem>
          <ListItem 
            className={classes.listItem} 
            component="a" 
            href={`${process.env.REACT_APP_PATH_ECOM}user/account/password`} 
            target="_blank"
          >
            <LockOutlinedIcon className={classes.icon}/>
            <ListItemText className={classes.listItemText} dense primary="Đổi mật khẩu" />
          </ListItem>
          <ListItem onClick={signOut} className={classes.listItem} button>
            <PowerSettingsNewIcon className={classes.icon}/>
            <ListItemText className={classes.listItemText} dense primary="Đăng xuất" />
          </ListItem>
        </List>
      </NavBarMenuPopper>
    </div>
  )
}

const mapStateToProps = ({ authReducer }) => {
  const { user, authRedirectUrl, authLoading } = authReducer;
  return {
    user,
    authRedirectUrl,
    authLoading
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: bindActionToPromise(dispatch,signOut)
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(AccountMenu);