import { createContext, ReactNode, useState } from 'react';
import { mapStoreToFilter, SortOptions, StoreFilter } from '../../lib/redux/api/search';
import { Store } from '../../pages/api/types';

export interface SearchContextInterface {
    sort: SortOptions;
    setSort: (sort: SortOptions) => void;
    storeFilter: StoreFilter[];
    addStoreToFilter: (store: Store) => void;
    removeStoreFromFilter: (store: Store) => void;
}

export const SearchContext = createContext<SearchContextInterface>({
    sort: '+price',
    setSort: () => {},
    storeFilter: [],
    addStoreToFilter: () => {},
    removeStoreFromFilter: () => {}
});

export function SearchProvider({ children }: { children: ReactNode }) {
    const [sort, setSort] = useState<SortOptions>('+price');
    const [storeFilter, setStoreFilter] = useState<StoreFilter[]>([]);

    const addStoreToFilter = (store: Store) => {
        const filter = mapStoreToFilter(store);
        setStoreFilter((prevState) => [...prevState, filter]);
    };

    const removeStoreFromFilter = (store: Store) => {
        const filter = mapStoreToFilter(store);
        setStoreFilter((prevState) => prevState.filter((s) => s !== filter));
    };

    return (
        <SearchContext.Provider value={{ sort, setSort, storeFilter, addStoreToFilter, removeStoreFromFilter }}>
            {children}
        </SearchContext.Provider>
    );
}
