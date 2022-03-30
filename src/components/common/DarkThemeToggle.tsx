import { IconButton, IconButtonProps, useColorMode } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export const DarkThemeToggle: React.VFC<Omit<IconButtonProps, 'aria-label'>> = ({ ...props }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDarkTheme = useMemo(() => colorMode === 'dark', [colorMode]);

    return (
        <IconButton
            aria-label="Toggle dark mode"
            icon={isDarkTheme ? <MdLightMode /> : <MdDarkMode />}
            onClick={toggleColorMode}
            variant="ghost"
            colorScheme="gray"
            {...props}
        />
    );
};
