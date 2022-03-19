import { useContext } from 'react';
import { SearchContext, SearchContextInterface } from '../SearchContext';

export const useSearchContext = (): SearchContextInterface => {
    return useContext(SearchContext);
};
