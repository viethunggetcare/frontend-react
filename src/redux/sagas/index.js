import { takeLatest } from 'redux-saga/effects';

import authSaga from 'redux/sagas/authSaga';
import productSaga from 'redux/sagas/productSaga';

import {
  authTypes,
  productTypes
} from 'redux/types';

/**
 * Root saga manages watcher lifecycle
 */
export default function* defaultSaga() {
  // auth
  yield takeLatest(authTypes.CHECK_AUTH, authSaga.checkAuth);
  yield takeLatest(authTypes.SIGN_OUT, authSaga.signOut);
  yield takeLatest(authTypes.SIGN_IN, authSaga.signIn);

  // products
  yield takeLatest(productTypes.FETCH_PRODUCTS, productSaga.fetchProducts);
}
