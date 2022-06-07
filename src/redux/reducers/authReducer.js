import {
  SET_AUTH,
  REMOVE_AUTH,
  SET_AUTH_LOADING,
  SET_AUTH_ERROR,
  SET_AUTH_REDIRECT_URL,
} from 'redux/types/authTypes';
import jwtService from 'utils/services/jwtService';

const initialState = {
  user: null,
  authLoading: true,
  authError: '',
  authRedirectUrl: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_ERROR: {
      return {
        ...state,
        authError: action.payload,
      }
    }
    case SET_AUTH_LOADING: {
      return {
        ...state,
        authLoading: action.payload,
      }
    }
    case SET_AUTH: {
      jwtService.saveToken(action.payload?.token);
      return {
        ...state,
        user: action.payload ? { ...action.payload } : null,
      };
    }
    case SET_AUTH_REDIRECT_URL: {
      return {
        ...state,
        authRedirectUrl: action.payload ? action.payload : '',
      };
    }
    case REMOVE_AUTH: {
      jwtService.destroyToken();
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
}

export default reducer;
