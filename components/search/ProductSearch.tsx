import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Text } from '@chakra-ui/react';
import { useLazyGetProductsFromTermQuery } from '../../lib/redux/api/search';
import { LoadingIndicator } from '../common/LoadingIndicator';
import { Products } from './Products';

export const ProductSearch: React.VFC = () => {
    const router = useRouter();
    const term = router.query.term as string;

    const [getProducts, { data, isLoading, isUninitialized, isFetching }] = useLazyGetProductsFromTermQuery();

    useEffect(() => {
        if (term) {
            getProducts({ term });
        }
    }, [getProducts, term]);

    if (isLoading || isUninitialized || isFetching) {
        return <LoadingIndicator />;
    }

    if (!data || data.length === 0) {
        return <Text textAlign="center">No products found</Text>;
    }

    return <Products products={data} />;
};
