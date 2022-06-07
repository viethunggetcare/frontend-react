import axios from 'axios';
import jwtService from 'utils/services/jwtService';
import { allocateRoute, isEmptyValue } from 'utils/helpers';

const authAxios = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

authAxios.interceptors.request.use(
  (req) => {
    const token = jwtService.getToken();
    req.headers.common['token'] = token;
    return req;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

authAxios.interceptors.response.use(
  (res) => {
    if (!isEmptyValue(res?.data?.error_code)) {
      allocateRoute(res.data.error_code);
    }
    return res;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

export default authAxios;
