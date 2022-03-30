import { Flex, Stack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Logo } from '../brand/Logo';

export const Sidebar: React.FC = ({ children }) => {
    return (
        <Flex
            display={{ base: 'none', lg: 'flex' }}
            w="16rem"
            direction="column"
            bg={useColorModeValue('white', 'gray.900')}
            shadow="sm"
            borderRight="1px solid"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            transition="0.2s"
        >
            <Stack spacing={4} position="sticky" top={0} p={4}>
                <Logo fontSize="4xl" />
                {children}
            </Stack>
        </Flex>
    );
};
