import { Heading, HeadingProps } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';

export const Logo: React.VFC<HeadingProps> = ({ ...props }) => {
    return (
        <NextLink href="/" passHref>
            <Heading fontSize="7xl" fontFamily="Montserrat" textAlign="center" as="a" {...props}>
                Grozer
            </Heading>
        </NextLink>
    );
};
