import { api } from '.';
import { CommonProduct, Store } from '../../../pages/api/types';

export type SortOptions = '+price' | '-price' | '+title' | '-title';
export type StoreFilter = 'jumbo' | 'ah' | 'aldi' | 'coop' | 'plus';
export type DietFilter = 'organic' | 'vegan' | 'vegetarian' | 'gluten_free' | 'lactose_free' | 'low_sugar' | 'low_fat';
export type AllergenFilter = 'gluten' | 'lactose' | 'diary' | 'soy' | 'peanuts' | 'nuts' | 'eggs';

export const mapStoreToFilter = (store: Store): StoreFilter => {
    switch (store) {
        case Store.JUMBO:
            return 'jumbo';
        case Store.ALBERT_HEIJN:
            return 'ah';
        case Store.ALDI:
            return 'aldi';
        case Store.COOP:
            return 'coop';
        case Store.PLUS:
            return 'plus';
        default:
            return 'jumbo';
    }
};

const searchApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProductsFromTerm: builder.query<
            CommonProduct[],
            {
                term: string;
                sort?: SortOptions;
                excludeSupermarkets?: StoreFilter[];
                diet?: DietFilter[];
                allergen?: AllergenFilter[];
            }
        >({
            query: ({ term, sort = '+price', excludeSupermarkets = [], diet = [], allergen = [] }) => {
                return {
                    url: '/search',
                    params: {
                        term,
                        sort,
                        excludeSupermarkets: excludeSupermarkets.join(','),
                        diet: diet.join(','),
                        allergen: allergen.join(',')
                    }
                };
            }
        })
    })
});

export const { useGetProductsFromTermQuery, useLazyGetProductsFromTermQuery } = searchApi;
