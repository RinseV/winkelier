import { Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { SortOptions, StoreFilter } from '../../lib/redux/api/search';
import { Header } from '../common/Header';
import { Layout } from '../layout/Layout';
import { Sidebar } from '../sidebar/Sidebar';
import { SupermarketFilter } from '../sidebar/SupermarketFilter';
import { ProductSearch } from './ProductSearch';
import { SearchHeader } from './SearchHeader';

export const Search: React.VFC = () => {
    const [sort, setSort] = useState<SortOptions>('+price');
    // Filter is exclusion filter
    const [filter, setFilter] = useState<StoreFilter[]>([]);

    return (
        <>
            <Sidebar>
                <SupermarketFilter filter={filter} setFilter={setFilter} />
            </Sidebar>
            <Layout>
                <Stack spacing={4} w="full">
                    <Header />
                    <SearchHeader sort={sort} setSort={setSort} />
                    <ProductSearch sort={sort} filter={filter} />
                </Stack>
            </Layout>
        </>
    );
};
