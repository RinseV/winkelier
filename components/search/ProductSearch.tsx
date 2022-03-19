import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useLazyGetProductsFromTermQuery } from '../../lib/redux/api/search';
import { LoadingIndicator } from '../common/LoadingIndicator';
import { useSearchContext } from './hooks/useSearchContext';
import { Products } from './Products';

export const ProductSearch: React.VFC = () => {
    const router = useRouter();
    const term = router.query.term as string;

    const { sort, storeFilter } = useSearchContext();

    const [getProducts, { data, isLoading, isUninitialized, isFetching }] = useLazyGetProductsFromTermQuery();

    useEffect(() => {
        if (term) {
            getProducts({ term, sort, excludeSupermarkets: storeFilter });
        }
    }, [term, sort, getProducts, storeFilter]);

    if (isLoading || isUninitialized || isFetching) {
        return <LoadingIndicator />;
    }

    if (!data || data.length === 0) {
        return <Text textAlign="center">No products found</Text>;
    }

    return <Products products={data} />;
};
