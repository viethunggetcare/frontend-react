import {
  SET_AUTH,
  REMOVE_AUTH,
  SET_AUTH_LOADING,
  SET_AUTH_ERROR,
  SET_AUTH_REDIRECT_URL,

  CHECK_AUTH,
  SIGN_OUT,
  SIGN_IN,
} from 'redux/types/authTypes';

// reducer

export function setAuthLoading(payload) {
  return {
    type: SET_AUTH_LOADING,
    payload
  };
}
export function setAuthError(payload) {
  return {
    type: SET_AUTH_ERROR,
    payload
  };
}
export function setAuth(payload) {
  return {
    type: SET_AUTH,
    payload
  };
}
export function setAuthRedirectUrl(payload) {
  return {
    type: SET_AUTH_REDIRECT_URL,
    payload
  };
}
export function removeAuth(payload) {
  return {
    type: REMOVE_AUTH,
    payload
  };
}

// saga

export function checkAuth(payload,meta) {
  return {
    type: CHECK_AUTH,
    payload,
    meta
  };
}

export function signOut(payload,meta) {
  return {
    type: SIGN_OUT,
    payload,
    meta
  };
}

export function signIn(payload,meta) {
  return {
    type: SIGN_IN,
    payload,
    meta
  };
}
