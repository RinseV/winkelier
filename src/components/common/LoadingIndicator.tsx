import { Flex, Spinner, SpinnerProps, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

export const LoadingIndicator: React.VFC<SpinnerProps> = (props) => {
    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            flex={1}
            color={useColorModeValue('brand.500', 'brand.200')}
            p={4}
        >
            <Spinner size="xl" thickness="4px" {...props} />
        </Flex>
    );
};
