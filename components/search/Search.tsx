import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SortOptions } from '../../lib/redux/api/search';
import { Header } from '../common/Header';
import { Layout } from '../layout/Layout';
import { Wrapper } from '../layout/Wrapper';
import { ProductSearch } from './ProductSearch';
import { SearchHeader } from './SearchHeader';

export const Search: React.VFC = () => {
    const router = useRouter();
    const term = router.query.term as string;

    const [sort, setSort] = useState<SortOptions>('+price');

    return (
        <Layout>
            <Wrapper variant="large">
                <Stack spacing={4} w="full">
                    <Header />
                    <SearchHeader sort={sort} setSort={setSort} />
                    <ProductSearch sort={sort} />
                </Stack>
            </Wrapper>
        </Layout>
    );
};
