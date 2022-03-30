import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import { Header } from '../common/Header';
import { Layout } from '../layout/Layout';
import { AllergenFilter } from '../sidebar/AllergenFilter';
import { DietFilter } from '../sidebar/DietFilter';
import { Sidebar } from '../sidebar/Sidebar';
import { SupermarketFilter } from '../sidebar/SupermarketFilter';
import { ProductSearch } from './ProductSearch';
import { SearchProvider } from './SearchContext';

export const Search: React.VFC = () => {
    const router = useRouter();
    const term = router.query.term as string;

    return (
        <>
            <Head>
                <title>Winkelier | {term}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
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
        </>
    );
};
