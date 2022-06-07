import commonAxios from 'utils/axios/commonAxios';
import { prepareFormData } from 'utils/helpers';

export default {
  fetchProducts: ({ params, cancelToken }) => {
    const formData = prepareFormData(params);
    return commonAxios.post(`products/search.json`,formData,{ cancelToken });
  },
}
