import { Flex, HStack, Link, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { AHIcon } from '../brand/icons/AH';
import { AldiIcon } from '../brand/icons/Aldi';
import { CoopIcon } from '../brand/icons/Coop';
import { IconLink } from '../brand/icons/IconLink';
import { JumboIcon } from '../brand/icons/Jumbo';
import { PlusIcon } from '../brand/icons/Plus';
import { Logo } from '../brand/Logo';
import { Layout } from '../layout/Layout';
import { SearchForm } from './SearchForm';

export const Home: React.VFC = () => {
    return (
        <Layout>
            <Flex direction="column" alignItems="center" justifyContent="center" flex={1} w="full">
                <Logo mb={8} fontSize={{ base: '5xl', md: '7xl' }} />
                <SearchForm />
            </Flex>
            <Stack mt="auto" pb={4} spacing={4} alignItems="center">
                <Text fontSize="sm">Currently supported supermarkets:</Text>
                <HStack spacing={{ base: 4, md: 8 }} alignItems="center">
                    <IconLink href="https://www.jumbo.com/">
                        <JumboIcon boxSize={{ base: '40px', md: '80px' }} />
                    </IconLink>
                    <IconLink href="https://www.ah.nl/">
                        <AHIcon boxSize={{ base: '40px', md: '80px' }} />
                    </IconLink>
                    <IconLink href="https://www.aldi.nl/">
                        <AldiIcon boxSize={{ base: '40px', md: '80px' }} />
                    </IconLink>
                    <IconLink href="https://www.coop.nl/">
                        <CoopIcon boxSize={{ base: '40px', md: '80px' }} />
                    </IconLink>
                    <IconLink href="https://www.plus.nl/">
                        <PlusIcon boxSize={{ base: '40px', md: '80px' }} />
                    </IconLink>
                </HStack>
            </Stack>
        </Layout>
    );
};
