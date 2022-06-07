import React from 'react'
import clsx from 'clsx'
import { useLocation, useHistory, useParams, Link as RouterLink, matchPath } from 'react-router-dom'
import { intersection } from 'lodash'
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  ListItem,
  ListItemText,
  Collapse,
  useTheme,
  makeStyles
} from '@material-ui/core'
import StyledSvgIcon from 'components/Styled/SvgIcon/SvgIcon'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import styles from './navLinkStyles'

const useStyles = makeStyles(styles,{name: 'NavbarLogo'})

const ListItemLink = React.forwardRef((props,ref) => <RouterLink ref={ref} {...props}/>);

const NavLink = (props) => {
  const { 
    user, 

    iconComponent,
    header, 
    childrenLinks,
    link,
    linkExact,
    activeURL,
    placement,
    disabledCollapse,
    permissionCode,
  } = props;
  
  const [collapseActive,setCollapseActive] = React.useState(true);
  
  const location = useLocation();
  const history = useHistory();
  const params = useParams();
  const theme = useTheme();

  const handleCollapseToggle = () => {
    setCollapseActive(prevCollapseActive => !prevCollapseActive)
  }

  const linkActive = !!matchPath(location.pathname, {
    path: activeURL,
    exact: !!linkExact,
    strict: false,
  });
  const hasChildrenLink = Array.isArray(childrenLinks) && childrenLinks.length > 0;

  React.useEffect(() => {
    if (hasChildrenLink && !linkActive) setCollapseActive(false);
  },[linkActive,hasChildrenLink])

  const classes = useStyles();
  const userMenuCodes = React.useMemo(() => user?.getcare_menu ? user?.getcare_menu.map(m => m.code) : [],[user?.getcare_menu]);
  // console.log("userMenuCodes",navLink.permissionCode,userMenuCodes)
  if (!!permissionCode) {
    if (Array.isArray(permissionCode) && intersection(permissionCode,userMenuCodes).length < 1) return null
    else if (typeof permissionCode === 'string' && !userMenuCodes.includes(permissionCode)) return null;
  }

  return (
    <>
      <ListItem 
        onClick={handleCollapseToggle}
        selected={linkActive} 
        classes={{
          root: classes.listItem,
          selected: classes.listItemSelected,
        }}
        style={{
          '--menu-item-padding-left': `${placement || theme.spacing(2)}px`,
        }}
        button
        component={ListItemLink}
        to={link}
      >
        {!!iconComponent && <StyledSvgIcon component={iconComponent} className={classes.icon}/>}
        <ListItemText className={classes.listItemText} primary={header} disableTypography />
        {hasChildrenLink && (
          <ExpandMoreIcon 
            className={clsx(classes.expandMoreIcon,{
              [classes.collapseActive]: collapseActive
            })}
          />
        )}
      </ListItem>
      {hasChildrenLink && (
        <Collapse in={!disabledCollapse ? false : collapseActive}>
          {childrenLinks.map((navLink,index) => (
            <NavLink
              key={index}
              {...navLink}
              placement={(placement || theme.spacing(2)) + theme.spacing(2)}
              user={user}
            />
          ))}
        </Collapse>
      )}
    </>
  )
}

const mapStateToProps = ({ authReducer }) => {
  const { user } = authReducer;
  return { user }
};
const withConnect = connect(mapStateToProps, null);
export default compose(withConnect)(NavLink);