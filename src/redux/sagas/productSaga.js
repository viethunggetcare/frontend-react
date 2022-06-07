import { put, call, cancelled, delay } from 'redux-saga/effects';
import axios from 'axios';

import { productActions } from 'redux/actions';
import { isErrorServer } from 'utils/helpers';
import productApi from 'utils/apis/productApi'
import {
  ERROR_SERVER,
} from 'utils/constants/errorMessageConstants';

const controlErrorMessageUpdate = (name) => function*(value) { 
  yield put(productActions.setErrorMessage({ name, value })) 
};

const controlLoadingUpdate = (name) => function*(value) { 
  yield put(productActions.setLoading({ name, value })) 
};

export function* fetchProducts(action) {
  const {
    params = {},
    debounce = 0,
  } = action?.payload || {};
  const {
    resolve = () => {}
  } = action?.meta || {};
  const setErrorMessage = controlErrorMessageUpdate('products')
  const setLoading = controlLoadingUpdate('products')
  
  const source = axios.CancelToken.source();
  let error;
  
  yield setLoading(true);
  yield setErrorMessage('');
  yield delay(debounce === true ? 500 : debounce);
  try {
    const { data: response } = yield call(productApi.fetchProducts, { params, cancelToken: source.token });
    
    if (isErrorServer(response.status)) yield setErrorMessage(response.message);
    else {
      
      yield put(productActions.setProducts(response?.params?.item || []));
      yield put(productActions.setProductsTotal(response?.params?.total || 0));
    }
    yield setLoading(false);
    resolve(response)
  } catch (err) {
    error = err;
  } finally {
    yield setLoading(false);
    if (yield cancelled()) {
      source.cancel('cancelled');
      resolve({ error: 'cancelled' });
    } else if ( error ) {
      console.log("fetchProducts",error);
      yield setErrorMessage(ERROR_SERVER);
      resolve({ error: error });
    };
  }
}

export default {
  fetchProducts,
}