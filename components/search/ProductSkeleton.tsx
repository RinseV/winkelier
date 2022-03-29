import { Flex, Skeleton, Stack } from '@chakra-ui/react';
import React from 'react';
import { Card } from '../layout/Card';

export const ProductSkeleton: React.VFC = () => {
    return (
        <Card h="19rem" justifySelf="center">
            <Skeleton height="10rem" width="12rem" borderRadius="md" alignSelf="center" mt={2} />
            <Flex direction="column" p={4} h="9rem">
                <Stack spacing={2}>
                    <Skeleton width="3.5rem" height="1.2rem" borderRadius="lg" />
                    <Skeleton width="10rem" height="1.5rem" alignSelf="center" borderRadius="sm" />
                </Stack>
                <Skeleton width="4rem" height="1.4rem" borderRadius="sm" mt="auto" />
            </Flex>
        </Card>
    );
};
