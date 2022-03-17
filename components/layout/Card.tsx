import { Flex, FlexProps, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

export const Card: React.FC<FlexProps> = (props) => {
    return (
        <Flex
            w="18rem"
            shadow="sm"
            borderRadius="lg"
            overflow="hidden"
            bg={useColorModeValue('white', 'gray.900')}
            direction="column"
            transition="0.2s"
            {...props}
        >
            {props.children}
        </Flex>
    );
};
