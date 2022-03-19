import React from 'react';
import { Header } from '../common/Header';
import { Layout } from '../layout/Layout';
import { AllergenFilter } from '../sidebar/AllergenFilter';
import { DietFilter } from '../sidebar/DietFilter';
import { Sidebar } from '../sidebar/Sidebar';
import { SupermarketFilter } from '../sidebar/SupermarketFilter';
import { ProductSearch } from './ProductSearch';
import { SearchProvider } from './SearchContext';

export const Search: React.VFC = () => {
    return (
        <SearchProvider>
            <Sidebar>
                <SupermarketFilter />
                <DietFilter />
                <AllergenFilter />
            </Sidebar>
            <Layout>
                <Header />
                <ProductSearch />
            </Layout>
        </SearchProvider>
    );
};
