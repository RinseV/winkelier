import { Flex, Stack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Logo } from '../brand/Logo';

export const Sidebar: React.FC = ({ children }) => {
    return (
        <Flex
            p={4}
            display={{ base: 'none', lg: 'flex' }}
            w="16rem"
            direction="column"
            bg={useColorModeValue('white', 'gray.900')}
        >
            <Stack spacing={4}>
                <Logo fontSize="5xl" />
                {children}
            </Stack>
        </Flex>
    );
};
