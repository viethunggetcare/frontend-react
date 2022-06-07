import {
  SET_PRODUCTS,
  SET_PRODUCTS_TOTAL,
  SET_ERROR_MESSAGE,
  SET_LOADING,

  FETCH_PRODUCTS
} from 'redux/types/productTypes';

// reducer

export function setProducts(payload) {
  return {
    type: SET_PRODUCTS,
    payload
  };
}
export function setProductsTotal(payload) {
  return {
    type: SET_PRODUCTS_TOTAL,
    payload
  };
}

export function setLoading({name, value}) {
  return {
    type: SET_LOADING,
    payload: {name, value}
  };
}
export function setErrorMessage({name, value}) {
  return {
    type: SET_ERROR_MESSAGE,
    payload: {name, value}
  };
}

// saga

export function fetchProducts(payload,meta) {
  return {
    type: FETCH_PRODUCTS,
    payload,
    meta
  };
}