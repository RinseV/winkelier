import { createContext, ReactNode, useEffect, useState } from 'react';
import { DietFilter, mapStoreToFilter, SortOptions, StoreFilter } from '../../lib/redux/api/search';
import { Store } from '../../pages/api/types';

export interface SearchContextInterface {
    sort: SortOptions;
    setSort: (sort: SortOptions) => void;
    storeFilter: StoreFilter[];
    addStoreToFilter: (store: Store) => void;
    removeStoreFromFilter: (store: Store) => void;
    dietFilter: DietFilter[];
    addDietToFilter: (diet: DietFilter) => void;
    removeDietFromFilter: (diet: DietFilter) => void;
}

export const SearchContext = createContext<SearchContextInterface>({
    sort: '+price',
    setSort: () => {},
    storeFilter: [],
    addStoreToFilter: () => {},
    removeStoreFromFilter: () => {},
    dietFilter: [],
    addDietToFilter: () => {},
    removeDietFromFilter: () => {}
});

export function SearchProvider({ children }: { children: ReactNode }) {
    const [sort, setSort] = useState<SortOptions>('+price');
    const [storeFilter, setStoreFilter] = useState<StoreFilter[]>([]);
    const [dietFilter, setDietFilter] = useState<DietFilter[]>([]);

    const addStoreToFilter = (store: Store) => {
        const filter = mapStoreToFilter(store);
        setStoreFilter((prevState) => [...prevState, filter]);
    };

    const removeStoreFromFilter = (store: Store) => {
        const filter = mapStoreToFilter(store);
        setStoreFilter((prevState) => prevState.filter((s) => s !== filter));
    };

    const addDietToFilter = (diet: DietFilter) => {
        setDietFilter((prevState) => [...prevState, diet]);
    };

    const removeDietFromFilter = (diet: DietFilter) => {
        setDietFilter((prevState) => prevState.filter((d) => d !== diet));
    };

    return (
        <SearchContext.Provider
            value={{
                sort,
                setSort,
                storeFilter,
                addStoreToFilter,
                removeStoreFromFilter,
                dietFilter,
                addDietToFilter,
                removeDietFromFilter
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}
