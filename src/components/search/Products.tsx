import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { CommonProduct } from '../../lib/api/types';
import { Product } from './Product';

type ProductsProps = {
    products: CommonProduct[];
};

export const Products: React.VFC<ProductsProps> = ({ products }) => {
    return (
        <SimpleGrid p={4} w="full" minChildWidth="300px" spacingX={2} spacingY={4}>
            {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </SimpleGrid>
    );
};
