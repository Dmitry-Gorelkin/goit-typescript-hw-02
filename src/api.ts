import axios, { AxiosRequestConfig } from 'axios';

const API_KEY = '25376419-21146ccb6c229e91e9e9974ae';
axios.defaults.baseURL = 'https://pixabay.com/api/';

type FetchImageOptions = {
  query: string;
  page: number;
  per_page: number;
};

export type ResponsImage = {
  id: number;
  webformatURL: string;
  tags: string;
  largeImageURL: string;
  collections?: number;
  comments?: number;
  downloads?: number;
  imageHeight?: number;
  imageSize?: number;
  imageWidth?: number;
  likes?: number;
  pageURL?: string;
  previewHeight?: number;
  previewURL?: string;
  previewWidth?: number;
  type?: string;
  user?: string;
  userImageURL?: string;
  user_id?: number;
  views?: number;
  webformatHeight?: number;
  webformatWidth?: number;
};

type Respons = {
  hits: ResponsImage[];
  total: number;
  totalHits: number;
};

export const fetchImage = async ({
  query,
  page,
  per_page,
}: FetchImageOptions): Promise<Respons> => {
  const options: AxiosRequestConfig = {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page,
    },
  };

  const response = await axios(options);
  return response.data;
};
