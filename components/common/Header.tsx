import { HStack } from '@chakra-ui/react';
import React from 'react';
import { Logo } from '../brand/Logo';
import { SearchBar } from '../search/SearchBar';
import { DarkThemeToggle } from './DarkThemeToggle';

export const Header: React.VFC = () => {
    return (
        <HStack spacing={8} alignItems="center">
            <SearchBar />
            <DarkThemeToggle />
        </HStack>
    );
};
