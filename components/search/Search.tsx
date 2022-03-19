import { Stack } from '@chakra-ui/react';
import React from 'react';
import { Header } from '../common/Header';
import { Layout } from '../layout/Layout';
import { Sidebar } from '../sidebar/Sidebar';
import { SupermarketFilter } from '../sidebar/SupermarketFilter';
import { ProductSearch } from './ProductSearch';
import { SearchProvider } from './SearchContext';
import { SearchHeader } from './SearchHeader';

export const Search: React.VFC = () => {
    return (
        <SearchProvider>
            <Sidebar>
                <SupermarketFilter />
            </Sidebar>
            <Layout>
                <Header />
                <ProductSearch />
            </Layout>
        </SearchProvider>
    );
};
