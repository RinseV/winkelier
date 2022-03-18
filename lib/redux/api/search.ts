import { api } from '.';
import { CommonProduct } from '../../../pages/api/types';

export type SortOptions = '+price' | '-price' | '+title' | '-title';

const searchApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProductsFromTerm: builder.query<CommonProduct[], { term: string; sort?: SortOptions }>({
            query: ({ term, sort = '+price' }) => `/search?term=${term}&sort=${sort}`
        })
    })
});

export const { useGetProductsFromTermQuery, useLazyGetProductsFromTermQuery } = searchApi;
