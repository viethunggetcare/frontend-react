import { toNumber, isNumber } from 'lodash';
import moment from 'moment';
import * as QueryString from 'query-string';

export const isEmptyValue = (value) => {
  if (Array.isArray(value)) return value.length === 0;
  return ['', null, undefined].includes(value);
};

export function isValidDate(date) {
  if (isEmptyValue(date)) return false;
  return moment(new Date(date)).isValid();
}

export function isValidNumber(number) {
  if (isEmptyValue(number)) return false;
  return isNumber(toNumber(number));
}

export function numberFormat(number, options) {
  const { locale, ...restOptions } = options || {};
  if (isEmptyValue(number)) return number;
  return new Intl.NumberFormat(locale || undefined, restOptions || {}).format(
    number
  );
}

export function getQueryString(queryParams, options) {
  const { skipEmptyString, ...restOptions } = options || {};
  const queryStringOptions = {
    arrayFormat: `bracket`,
    skipNull: true,
    ...restOptions,
  };
  if (skipEmptyString) {
    queryParams = Object.keys(queryParams).reduce((memo, key) => {
      if (queryParams[key] !== '') memo[key] = queryParams[key];
      return memo;
    }, {});
  }
  return QueryString.stringify(queryParams, {
    ...queryStringOptions,
  });
}

export function getQueryParams(queryString, options = {}) {
  const queryStringOptions = {
    arrayFormat: `bracket`,
    parseBooleans: true,
    parseNumbers: true,
    ...options,
  };
  return QueryString.parse(queryString, {
    ...queryStringOptions,
  });
}

export function queryFormat(body) {
  return Object.keys(body).reduce((memo, key) => {
    if (![undefined].includes(body[key])) memo[key] = body[key];
    return memo;
  }, {});
}

export function isValidJSONString(jsonString) {
  return /^[\],:{}\s]*$/.test(
    jsonString
      .replace(/\\["\\/bfnrtu]/g, '@')
      .replace(
        /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g,
        ']'
      )
      .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
  );
}

/* allocate route */
export function allocateRoute(errorCode) {
  switch (errorCode) {
    case 401:
      // window.location.replace(`${process.env.REACT_APP_PATH_SSO}?continue=${process.env.REACT_APP_PATH_VENDOR}`);
      break;
    case 403:
      // window.location.replace(`/403`);
      break;
    case 404:
      // window.location.replace(`/404`);
      break;
    default:
      break;
  }
}

export const isErrorServer = (status) => {
  return status !== 200
}

export function convertVietnamese(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/\\/g, '\\\\');
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
}

export function matchingKeyword(keyword, text) {
  const alphabetVn = {
    a: [
      'a',
      'à',
      'á',
      'ạ',
      'ả',
      'ã',
      'â',
      'ầ',
      'ấ',
      'ậ',
      'ẩ',
      'ẫ',
      'ă',
      'ằ',
      'ắ',
      'ặ',
      'ẳ',
      'ẵ',
    ],
    e: ['e', 'è', 'é', 'ẹ', 'ẻ', 'ẽ', 'ê', 'ề', 'ế', 'ệ', 'ể', 'ễ'],
    i: ['i', 'ì', 'í', 'ị', 'ỉ', 'ĩ'],
    o: [
      'o',
      'ò',
      'ó',
      'ọ',
      'ỏ',
      'õ',
      'ô',
      'ồ',
      'ố',
      'ộ',
      'ổ',
      'ỗ',
      'ơ',
      'ờ',
      'ớ',
      'ợ',
      'ở',
      'ỡ',
    ],
    u: ['u', 'ù', 'ú', 'ụ', 'ủ', 'ũ', 'ư', 'ừ', 'ứ', 'ự', 'ử', 'ữ'],
    y: ['y', 'ỳ', 'ý', 'ỵ', 'ỷ', 'ỹ'],
    d: ['d', 'đ'],
  };
  let keywordConvertToVn = keyword ? convertVietnamese(keyword).trim() : '';
  let splitKeywordConvertToVns = keywordConvertToVn.split('');
  let patternRegExr = splitKeywordConvertToVns
    .map((key) => {
      return alphabetVn[key] ? `[${alphabetVn[key].join('|')}]` : key;
    })
    .join('');
  return new RegExp(patternRegExr, 'i').test(text || '');
}

export const bindActionToPromise =
  (dispatch, actionCreator, meta) => (payload) => {
    return new Promise((resolve, reject) =>
      dispatch(actionCreator(payload, { ...meta, resolve, reject }))
    );
  };

export const focusInputErrorElement = ({
  errors,
  path = '',
  formElement = document,
}) => {
  if (!errors) return false;
  for (const [key, value] of Object.entries(errors)) {
    if (typeof value === 'string') {
      const inputEl = formElement.querySelector(`[name="${path}${key}"]`);
      if (inputEl) {
        if (inputEl.tagName === 'INPUT') {
          inputEl.focus();
        } else {
          inputEl.scrollIntoView({
            behavior: 'smooth',
          });
        }
        return true;
      }
    } else if (Array.isArray(value)) {
      for (const [index, item] of value.entries()) {
        const result = focusInputErrorElement({
          errors: item,
          path: `${key}[${index}].`,
          formElement,
        });
        if (result) return true;
      }
    } else if (!!value) {
      const result = focusInputErrorElement({
        errors: value,
        path: `${key}.`,
        formElement,
      });
      if (result) return true;
    }
  }
  return false;
};

export const prepareFormData = (params) => {
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    if ( Array.isArray(params[key]) ) {
      for (let value of params[key]) {
        formData.append(`${key}[]`,value)
      }
    } else if (!isEmptyValue(params[key])) {
      formData.append(key, params[key])
    };
  });
  return formData
}

export const getLinearProgressValue = ({ value, max, min }) => {
  const _min = min || 0;
  const result =  (value - _min) * 100 / (max - _min);
  return result > 100 ? 100 : result;
}