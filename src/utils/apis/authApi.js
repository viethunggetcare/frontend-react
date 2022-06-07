import authAxios from 'utils/axios/authAxios';

export default {
  signIn: () => {
    return authAxios.post(`user/sign_in`, {}, { withCredentials: true });
  },
  checkAuth: ({ params, cancelToken }) => {
    return authAxios.post(`user/auth`, params, { withCredentials: true, cancelToken });
  },
  signOut: () => {
    return authAxios.post(`user/sign_out`, {}, { withCredentials: true });
  }
}
