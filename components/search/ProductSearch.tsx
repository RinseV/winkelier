import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { SortOptions, useLazyGetProductsFromTermQuery } from '../../lib/redux/api/search';
import { LoadingIndicator } from '../common/LoadingIndicator';
import { Products } from './Products';

type ProductSearchProps = {
    sort: SortOptions;
};

export const ProductSearch: React.VFC<ProductSearchProps> = ({ sort }) => {
    const router = useRouter();
    const term = router.query.term as string;

    const [getProducts, { data, isLoading, isUninitialized, isFetching }] = useLazyGetProductsFromTermQuery();

    useEffect(() => {
        if (term) {
            getProducts({ term, sort });
        }
    }, [term, sort, getProducts]);

    if (isLoading || isUninitialized || isFetching) {
        return <LoadingIndicator />;
    }

    if (!data || data.length === 0) {
        return <Text textAlign="center">No products found</Text>;
    }

    return <Products products={data} />;
};
