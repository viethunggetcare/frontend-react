import {
  SET_PRODUCTS,
  SET_PRODUCTS_TOTAL,
  SET_ERROR_MESSAGE,
  SET_LOADING,
} from 'redux/types/productTypes';

const initialState = {
  products: null,
  productsTotal: 0,
  productsLoading: true,
  productErrorMessage: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      }
    }
    case SET_PRODUCTS_TOTAL: {
      return {
        ...state,
        productsTotal: action.payload,
      }
    }
    
    case SET_ERROR_MESSAGE: {
      return {
        ...state,
        [`${action.payload.name}ErrorMessage`]: action.payload.value,
      }
    }
    case SET_LOADING: {
      return {
        ...state,
        [`${action.payload.name}Loading`]: action.payload.value,
      }
    }
    default:
      return state;
  }
}

export default reducer;
