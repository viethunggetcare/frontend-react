import { put, call, cancelled, debounce, delay } from 'redux-saga/effects';
import axios from 'axios';

import { authActions } from 'redux/actions';
import { isErrorServer } from 'utils/helpers';
import authApi from 'utils/apis/authApi'
import {
  ERROR_SERVER,
} from 'utils/constants/errorMessageConstants';

export function* checkAuth(action) {
  const {
    params = {},
    debounce = 0,
  } = action?.payload || {};
  const {
    resolve = () => {}
  } = action?.meta || {};
  
  const source = axios.CancelToken.source();
  let error;
  
  yield put(authActions.setAuthLoading(true));
  yield put(authActions.setAuthError(''));
  yield delay(debounce === true ? 500 : debounce);
  try {
    const { data: response } = yield call(authApi.checkAuth, { params, cancelToken: source.token });
    
    if (!isErrorServer(response.code)) yield put(authActions.setAuthError(response.message));
    else {
      yield put(authActions.setAuth(response.data || null));
    }
    yield put(authActions.setAuthLoading(false));
    resolve(response)
  } catch (err) {
    error = err;
  } finally {
    yield put(authActions.setAuthLoading(false));
    if (yield cancelled()) {
      source.cancel('cancelled');
      resolve({ error: 'cancelled' });
    } else if ( error ) {
      console.log("checkAuth",error);
      yield put(authActions.setAuthError(ERROR_SERVER));
      resolve({ error: error });
    };
  }
}

export function* signOut(action) {
  const {
    resolve = () => {}
  } = action?.meta || {};

  const source = axios.CancelToken.source();
  let error;
  
  yield put(authActions.setAuthLoading(true));
  yield put(authActions.setAuthError(''));
  yield delay(debounce === true ? 500 : debounce);
  try {
    const { data: response } = yield call(authApi.signOut, { cancelToken: source.token });
    
    if (!isErrorServer(response.code)) yield put(authActions.setAuthError(response.message));
    else {
      yield put(authActions.setAuth(response?.data || null));
    }
    yield put(authActions.setAuthLoading(false));
    resolve(response)
  } catch (err) {
    error = err;
  } finally {
    yield put(authActions.setAuthLoading(false));
    if (yield cancelled()) {
      source.cancel('cancelled');
      resolve({ error: 'cancelled' });
    } else if ( error ) {
      console.log("checkAuth",error);
      yield put(authActions.setAuthError(ERROR_SERVER));
      resolve({ error: error });
    };
  }
}

export function* signIn(action) {
  const {
    resolve = () => {}
  } = action?.meta || {};

  const source = axios.CancelToken.source();
  let error;
  
  yield put(authActions.setAuthLoading(true));
  yield put(authActions.setAuthError(''));
  yield delay(debounce === true ? 500 : debounce);
  try {
    const { data: response } = yield call(authApi.signIn, { cancelToken: source.token });
    
    if (!isErrorServer(response.code)) yield put(authActions.setAuthError(response.message));
    else {
      yield put(authActions.setAuth(response?.data || null));
    }
    yield put(authActions.setAuthLoading(false));
    resolve(response)
  } catch (err) {
    error = err;
  } finally {
    yield put(authActions.setAuthLoading(false));
    if (yield cancelled()) {
      source.cancel('cancelled');
      resolve({ error: 'cancelled' });
    } else if ( error ) {
      console.log("checkAuth",error);
      yield put(authActions.setAuthError(ERROR_SERVER));
      resolve({ error: error });
    };
  }
}

export default {
  checkAuth,
  signOut,
  signIn
}