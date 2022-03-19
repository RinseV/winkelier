import { api } from '.';
import { CommonProduct, Store } from '../../../pages/api/types';

export type SortOptions = '+price' | '-price' | '+title' | '-title';
export type StoreFilter = 'jumbo' | 'ah';
export type DietFilter =
    | 'organic'
    | 'vegan'
    | 'vegetarian'
    | 'gluten_intolerant'
    | 'lactose_intolerant'
    | 'low_sugar'
    | 'low_fat';

export const mapStoreToFilter = (store: Store): StoreFilter => {
    switch (store) {
        case Store.JUMBO:
            return 'jumbo';
        case Store.ALBERT_HEIJN:
            return 'ah';
        default:
            return 'jumbo';
    }
};

const searchApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProductsFromTerm: builder.query<
            CommonProduct[],
            { term: string; sort?: SortOptions; excludeSupermarkets?: StoreFilter[]; diets?: DietFilter[] }
        >({
            query: ({ term, sort = '+price', excludeSupermarkets = [], diets = [] }) =>
                `/search?term=${term}&sort=${sort}&excludeSupermarkets=${excludeSupermarkets.join(
                    ','
                )}&diet=${diets.join(',')}`
        })
    })
});

export const { useGetProductsFromTermQuery, useLazyGetProductsFromTermQuery } = searchApi;
