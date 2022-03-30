import { Collapse, IconButton, SimpleGrid, Stack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { MdMenu } from 'react-icons/md';

export const MobileMenu: React.FC = ({ children }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack display={{ base: 'flex', lg: 'none' }} spacing={4}>
            <IconButton aria-label="Open menu" icon={<MdMenu />} onClick={onToggle} />
            <Collapse in={isOpen} animateOpacity>
                <SimpleGrid w="100%" minChildWidth="12rem" spacing={4}>
                    {children}
                </SimpleGrid>
            </Collapse>
        </Stack>
    );
};
