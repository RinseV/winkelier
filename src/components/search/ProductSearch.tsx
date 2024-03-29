import { SimpleGrid, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useLazyGetProductsFromTermQuery } from '../../lib/redux/api/search';
import { useSearchContext } from './hooks/useSearchContext';
import { Products } from '../product/Products';
import { ProductSkeleton } from '../product/ProductSkeleton';

export const ProductSearch: React.VFC = () => {
    const router = useRouter();
    const term = router.query.term as string;

    const { sort, storeFilter, dietFilter, allergenFilter } = useSearchContext();

    const [getProducts, { data, isLoading, isUninitialized, isFetching }] = useLazyGetProductsFromTermQuery();

    useEffect(() => {
        if (term) {
            getProducts({ term, sort, excludeSupermarkets: storeFilter, diet: dietFilter, allergen: allergenFilter });
        }
    }, [term, sort, getProducts, storeFilter, dietFilter, allergenFilter]);

    if (isLoading || isUninitialized || isFetching) {
        return (
            <SimpleGrid p={4} w="full" minChildWidth="300px" spacingX={2} spacingY={4}>
                {[...Array(20)].map((_, i) => (
                    <ProductSkeleton key={i} />
                ))}
            </SimpleGrid>
        );
    }

    if (!data || data.length === 0) {
        return (
            <Text textAlign="center" p={4}>
                No products found
            </Text>
        );
    }

    return <Products products={data} />;
};
