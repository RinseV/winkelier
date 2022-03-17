import { Flex, HStack, Link, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { Logo } from '../brand/Logo';
import { Layout } from '../layout/Layout';
import { SearchForm } from './SearchForm';

export const Home: React.VFC = () => {
    return (
        <Layout>
            <Flex direction="column" alignItems="center" justifyContent="center" flex={1} w="full">
                <Logo mb={8} />
                <SearchForm />
            </Flex>
            <Stack mt="auto" pb={4} spacing={4} alignItems="center">
                <Text fontSize="sm">Currently supported supermarkets:</Text>
                <HStack spacing={8} alignItems="center">
                    <Link
                        href="https://www.jumbo.com/"
                        transition="all 0.1s"
                        _hover={{
                            transform: 'scale(1.1)'
                        }}
                    >
                        <Image
                            alt="Jumbo logo"
                            width={80}
                            height={80}
                            src="/Jumbo.svg"
                            placeholder="blur"
                            blurDataURL="https://www.jumbo.com/INTERSHOP/static/WFS/Jumbo-Grocery-Site/-/Jumbo-Grocery/nl_NL/CMS/Images/Thumbnails-search-%28180x180%29/search-algemeen.png"
                        />
                    </Link>
                    <Link
                        href="https://www.ah.nl/"
                        transition="all 0.1s"
                        _hover={{
                            transform: 'scale(1.1)'
                        }}
                    >
                        <Image
                            alt="AH logo"
                            width={80}
                            height={80}
                            src="/AH.svg"
                            placeholder="blur"
                            blurDataURL="https://static.ah.nl/ah-static/images/logo-ah.png"
                        />
                    </Link>
                </HStack>
            </Stack>
        </Layout>
    );
};
