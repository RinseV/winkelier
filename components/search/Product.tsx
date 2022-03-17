import { Badge, HStack, Image, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { CommonProduct } from '../../pages/api/types';
import { Card } from '../layout/Card';
import { useGetProductProperties } from './hooks/useGetProductProperties';

type ProductProps = {
    product: CommonProduct;
};

export const Product: React.VFC<ProductProps> = ({ product }) => {
    const { colorScheme, formattedPrice } = useGetProductProperties(product);
    const placeholder = useColorModeValue('/placeholder.svg', '/placeholder_dark.svg');

    return (
        <NextLink href={product.url} passHref>
            <Card
                justifySelf="center"
                as="a"
                _hover={{
                    transform: 'scale(1.05)'
                }}
            >
                <Image
                    maxW="10rem"
                    alignSelf="center"
                    transition="0.2s"
                    src={product.thumbnailUrl}
                    fallbackSrc={placeholder}
                    alt={product.title}
                    mt={2}
                />
                <Stack spacing={2} p={4} h="full">
                    <HStack>
                        <Badge borderRadius="full" px={2} colorScheme={colorScheme}>
                            {product.store}
                        </Badge>
                    </HStack>
                    <Text fontWeight="bold" textAlign="center" h="full">
                        {product.title}
                    </Text>
                    <Text>{formattedPrice}</Text>
                </Stack>
            </Card>
        </NextLink>
    );
};
