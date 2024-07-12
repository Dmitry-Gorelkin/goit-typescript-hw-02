import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const API_KEY = '25376419-21146ccb6c229e91e9e9974ae';
axios.defaults.baseURL = 'https://pixabay.com/api/';

type FetchImageOptions = {
  q: string;
  page: number;
  per_page: number;
};

export const fetchImage = async ({ q, page = 1, per_page = 12 }: FetchImageOptions) => {
  const options: AxiosRequestConfig = {
    params: {
      key: API_KEY,
      q,
      page,
      per_page,
    },
  };

  const response = await axios(options);
  return response.data;
};
