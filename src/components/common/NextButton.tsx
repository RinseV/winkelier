import React from 'react';
import NextLink from 'next/link';
import { Button, ButtonProps } from '@chakra-ui/react';

type NextButtonProps = {
    href: string;
    children: React.ReactNode;
} & ButtonProps;

export const NextButton: React.VFC<NextButtonProps> = ({ href, children, ...props }) => {
    return (
        <NextLink href={href} passHref>
            <Button as="a" {...props}>
                {children}
            </Button>
        </NextLink>
    );
};
