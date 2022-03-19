import React from 'react';
import { Flex, FlexProps, useColorModeValue } from '@chakra-ui/react';

export const Container: React.FC<FlexProps> = ({ children, ...props }) => {
    return (
        <Flex minH="100vh" bg={useColorModeValue('gray.50', 'gray.800')} transition="0.2s" {...props}>
            {children}
        </Flex>
    );
};
