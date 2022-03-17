import { api } from '.';
import { CommonProduct } from '../../../pages/api/types';

const searchApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProductsFromTerm: builder.query<CommonProduct[], { term: string }>({
            query: ({ term }) => `/search?term=${term}`
        })
    })
});

export const { useGetProductsFromTermQuery, useLazyGetProductsFromTermQuery } = searchApi;
