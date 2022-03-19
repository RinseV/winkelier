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
                <Stack spacing={4} w="full">
                    <Header />
                    <SearchHeader />
                    <ProductSearch />
                </Stack>
            </Layout>
        </SearchProvider>
    );
};
