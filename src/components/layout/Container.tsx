import React from 'react';
import Head from 'next/head';
import { Flex, FlexProps, useColorModeValue } from '@chakra-ui/react';

export const Container: React.FC<FlexProps> = ({ children, ...props }) => {
    return (
        <Flex minH="100vh" bg={useColorModeValue('gray.50', 'gray.800')} transition="0.2s" {...props}>
            <Head>
                <title>Winkelier</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {children}
        </Flex>
    );
};
