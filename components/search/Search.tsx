import { Heading, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useLazyGetProductsFromTermQuery } from '../../lib/redux/api/search';
import { Header } from '../common/Header';
import { LoadingIndicator } from '../common/LoadingIndicator';
import { Layout } from '../layout/Layout';
import { Wrapper } from '../layout/Wrapper';
import { Products } from './Products';
import { ProductSearch } from './ProductSearch';
import { SearchBar } from './SearchBar';

export const Search: React.VFC = () => {
    const router = useRouter();
    const term = router.query.term as string;

    return (
        <Layout>
            <Wrapper variant="large">
                <Stack spacing={4} w="full">
                    <Header />
                    <Heading>“{term}”</Heading>
                    <ProductSearch />
                </Stack>
            </Wrapper>
        </Layout>
    );
};
