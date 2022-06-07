import React, { Suspense } from 'react';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter,
  useLocation,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { isEqual } from 'lodash';

import { checkAuth } from 'redux/actions/authActions';
import { defaultTheme } from 'assets/jss/themes';
import {
  WEBSOCKET_ENDPOINT,
  KEEP_CONNECT_MSG,
  ON_BUS_WEBSOCKET_LISTEN
} from 'utils/constants/wsConstants';
import eventBusService from 'utils/services/eventBusService';
import { ALERT_DIALOG } from 'utils/constants/eventBusConstants';
import jwtService from 'utils/services/jwtService';
import { isValidJSONString, bindActionToPromise } from 'utils/helpers';

import { routes } from 'routes/routes';
import { toast, ToastContainer } from 'react-toastify';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
  LinearProgress,
} from '@material-ui/core';
import AlertDialog from 'components/AlertDialog/AlertDialog';
import LoadingBackdrop from 'components/LoadingBackdrop/LoadingBackdrop';
import usePrevious from 'hooks/usePrevious';

import AppStyles from 'assets/jss/app';

// import './App.scss';

const ScrollToTop = () => {
  const location = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = '';
  }, [location.pathname]);

  return null;
};

const App = (props) => {
  const { user, authRedirectUrl, authLoading, checkAuth } = props;

  const [theme] = React.useState(createTheme(defaultTheme));

  const prevUser = usePrevious(user);

  const mountedRef = React.useRef(false);
  const wsTimeoutRef = React.useRef(250);
  const wsRef = React.useRef();

  const checkWebsocketConnection = () => {
    if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED)
      connectWebsocket();
  };

  const connectWebsocket = () => {
    wsRef.current = new WebSocket(
      `${WEBSOCKET_ENDPOINT}?token=${jwtService.getToken()}`
    );
    let connectInterval;
    let connectHoldingInterval;
    wsRef.current.onopen = () => {
      wsTimeoutRef.current = 250;
      clearTimeout(connectInterval);
      clearInterval(connectHoldingInterval);
      connectHoldingInterval = setInterval(keepConnectWebsocket, 30000);

      wsRef.current.onmessage = (e) => {
        if (!e.data || !isValidJSONString(e.data)) return;
        const message = JSON.parse(e.data);
        eventBusService.dispatch(ON_BUS_WEBSOCKET_LISTEN,message)
        // if (message.result === false) {
        //   toast.error(message.message);
        //   return;
        // }
        // if (![KEEP_CONNECT_MSG, KEEP_CONNECT_RES].includes(message.event)) {
        //   props.saveWSEvent({
        //     ...message,
        //     indexField: 'event',
        //   });
        // }
      };
    };
    wsRef.current.onerror = (err) => {
      console.error('Socket encountered error: ', err, 'Closing socket');
      closeWebsocket();
    };
    wsRef.current.onclose = (e) => {
      wsTimeoutRef.current = wsTimeoutRef.current + wsTimeoutRef.current;
      connectInterval = setTimeout(
        checkWebsocketConnection,
        Math.min(10000, wsTimeoutRef.current)
      );
      clearInterval(connectHoldingInterval);
    };
  };

  const keepConnectWebsocket = () => {
    wsRef.current &&
      wsRef.current.send(
        JSON.stringify({
          event: KEEP_CONNECT_MSG,
        })
      );
  };

  const closeWebsocket = () => {
    wsRef.current && wsRef.current.close();
  };

  const handleUserConfirm = (message, callback) => {
    eventBusService
      .dispatchAsync(ALERT_DIALOG, {
        title: 'Leave page?',
        content: message,
        cancelButtonProps: {
          show: true,
          text: 'Cancel',
        },
        confirmButtonProps: {
          text: 'Ok',
        },
      })
      .then(({ isConfirmed }) => {
        isConfirmed && callback(true);
      });
  };

  const formatPath = (path) => {
    return path && path.charAt(1) ? path : '';
  };

  React.useEffect(() => {
    if (!mountedRef.current) return;
    console.log('user', user);
    if (!authLoading) {
      if (!user?.id) {
        // check auth failed
        // window.location.href = `/`;
      } else {
        // check auth success but user is going to the wrong vendor
        // window.location.href = authRedirectUrl || `/`;
      }
    }
    if (prevUser?.id && !user?.id) {
      // logout success
      // window.location.href = `/`;
    }

    if (user?.token && !isEqual(user, prevUser)) {
      // conect websocket
      connectWebsocket();
    }
  }, [user, authLoading, authRedirectUrl]);

  React.useEffect(() => {
    mountedRef.current = true;
    // checkAuth();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <AppStyles />
          <BrowserRouter getUserConfirmation={handleUserConfirm}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/products" />
              </Route>
              {routes.map((route, key) => {
                const paths =
                  !route.routes && route.path && route.path.charAt(1)
                    ? [route.path]
                    : [];
                const Component = route.component;
                const mapPaths = ({ routeItems, parentPath }) => {
                  routeItems.forEach((r) => {
                    const combineOfPath = parentPath + formatPath(r.path);
                    if (r.routes)
                      mapPaths({
                        routeItems: r.routes,
                        parentPath: combineOfPath,
                      });
                    else if (!paths.includes(combineOfPath))
                      paths.push(combineOfPath);
                  });
                };
                if (route.routes) {
                  mapPaths({
                    routeItems: route.routes,
                    parentPath: formatPath(route.path),
                  });
                }
                return (
                  // <RouteWithSubRoutes key={i} {...route} />
                  <Route
                    key={key}
                    path={paths}
                    exact
                    render={(props) => (
                      <>
                        <ScrollToTop />
                        <Suspense fallback={<LinearProgress />}>
                          <Component
                            {...props}
                            path={formatPath(route.path)}
                            routes={route.routes}
                          />
                        </Suspense>
                      </>
                    )}
                  />
                );
              })}
            </Switch>
          </BrowserRouter>
          <AlertDialog />
          <LoadingBackdrop />
        </StylesProvider>
      </MuiThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick
      />
    </div>
  );
};

const mapStateToProps = ({ authReducer }) => {
  // console.log(",",authReducer)
  const { user, authLoading } = authReducer;
  return {
    user,
    authLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: bindActionToPromise(dispatch,checkAuth),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(React.memo(App));
