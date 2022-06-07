import axios from 'axios';
import { allocateRoute, isEmptyValue } from 'utils/helpers';

const commonAxios = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

commonAxios.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

commonAxios.interceptors.response.use(
  (res) => {
    if (!isEmptyValue(res?.data?.code)) {
      allocateRoute(res.data.code);
    }
    return res;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

export default commonAxios;
