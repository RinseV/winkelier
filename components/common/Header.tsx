import { HStack, Stack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { SearchBar } from '../search/SearchBar';
import { SearchHeader } from '../search/SearchHeader';
import { DarkThemeToggle } from './DarkThemeToggle';

export const Header: React.VFC = () => {
    return (
        <Stack
            p={4}
            spacing={4}
            w="full"
            position="sticky"
            top={0}
            bg={useColorModeValue('white', 'gray.900')}
            zIndex={1}
            boxShadow="0 0.25rem 0.25rem -0.25rem rgba(0, 0, 0, 0.05)"
            transition="0.2s"
        >
            <HStack spacing={8} alignItems="center">
                <SearchBar />
                <DarkThemeToggle />
            </HStack>
            <SearchHeader />
        </Stack>
    );
};
