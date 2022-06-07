import React, { Suspense } from 'react';
import { Switch, Route, useLocation } from "react-router-dom";

import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  LinearProgress,
  useTheme,
  useMediaQuery,
  makeStyles
} from '@material-ui/core'
import Navbar from 'components/Navbar/Navbar'
import Sidebar from 'components/Sidebar/Sidebar'
// import PermissionDenied from 'views/PermissionDenied/PermissionDenied'
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import StyledContainer from 'components/Styled/Container/Container';
import StyledToolbar from 'components/Styled/Toolbar/Toolbar'

import styles from './layoutStyles';

// import classes from './LayoutAdmin.module.scss';

const useStyles = makeStyles(styles,{name: 'Layout'})

// const RouteWithPermission = (props) => {
//   const { 
//     user,
//     component: Component,
//     permissionCode,
//     ...rest
//   } = props;
  
//   const history = useHistory();

//   const userMenuCodes = React.useMemo(() => user?.getcare_menu ? user?.getcare_menu.map(m => m.code) : [],[user?.getcare_menu]);

//   React.useLayoutEffect(() => {
//     // const userMenuCodes = user?.getcare_menu ? user?.getcare_menu.map(m => m.code) : [];
//     // if (!!permissionCode && !userMenuCodes.includes(permissionCode)) {
//     //   history.push('/403')
//     // }
//   })

//   if (!!permissionCode && !userMenuCodes.includes(permissionCode)) return <PermissionDenied/>;
//   return (
//     <Suspense fallback="loading...">
//       <Component
//         {...rest}
//       />
//     </Suspense>
//   )
// }

const Layout = (props) => {
  const { 
    routes, 
    path,
    authLoading,
    user,
  } = props;

  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
  const sidebarPositionFixed = React.useMemo(() => {
    return isMobile || ['/shop-decoration'].includes(location.pathname)
  },[isMobile,location.pathname])
  
  const [sidebarOpen,setSidebarOpen] = React.useState(!sidebarPositionFixed);
  const [disabledSidebarOpen,setDisabledSidebarOpen] = React.useState(!sidebarPositionFixed);

  const handleSidebarToggle = (action) =>  () => {
    if (action === 'MENU_ICON_CLICK') {
      setSidebarOpen(!sidebarOpen);
      setDisabledSidebarOpen(!sidebarOpen)
    } else if (sidebarPositionFixed || !disabledSidebarOpen) {
      setSidebarOpen(action === 'SIDEBAR_TOGGLE');
    }
  }

  React.useEffect(() => {
    setSidebarOpen(!sidebarPositionFixed)
  },[location.pathname,sidebarPositionFixed])

  const classes = useStyles();
  const hasAuth = user && user.id;

  return (
    !authLoading ? (
      <LinearProgress/>
    ) : (
      <div className={classes.root}>
        <Header/>
        <StyledToolbar/>
        <div className={classes.main}>
          <StyledContainer className={classes.container}>
            <Switch>
              {routes.map((route, i) => (
                <Route 
                  key={i}
                  path={`${path}${route.path}`}
                  exact={route.exact}
                  render={props => {
                    return (
                      <>
                        {/* <RouteWithPermission 
                          user={user} 
                          {...props} 
                          path={`${path}${route.path}`} 
                          routes={route.routes} 
                          component={route.component}
                          permissionCode={route.permissionCode}
                        /> */}
                        <Suspense fallback="loading...">
                          <route.component
                            path={`${path}${route.path}`} 
                            routes={route.routes} 
                            {...props} 
                          />
                        </Suspense>
                      </>
                    )
                  }}
                />
              ))}
            </Switch>
          </StyledContainer>
        </div>
        <Footer/>
      </div>
    )
  )
}

const mapStateToProps = ({ authReducer }) => {
  const { user, authLoading } = authReducer;
  return {
    user,
    authLoading
  }
};
const withConnect = connect(mapStateToProps);
export default compose(withConnect)(Layout);
