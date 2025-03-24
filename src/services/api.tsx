import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';

export const productsAPI = createApi({
  reducerPath: 'productsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${Config.PRODUCT_API}` }),
  endpoints: builder => ({
    getAllProducts: builder.query<any, void>({
      query: () => '/category/mens-shirts',
    }),
  }),
});

export const { useGetAllProductsQuery } = productsAPI;
