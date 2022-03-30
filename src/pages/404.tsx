import { Heading, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { MdHome } from 'react-icons/md';
import { DarkThemeToggle } from '../components/common/DarkThemeToggle';
import { NextButton } from '../components/common/NextButton';
import { Container } from '../components/layout/Container';

const Custom404: NextPage = () => {
    return (
        <Container alignItems="center" justifyContent="center">
            <DarkThemeToggle position="fixed" top="1rem" right="1rem" />
            <Stack alignItems="center" spacing={4}>
                <Heading fontSize="5xl" fontFamily="Roboto Mono">
                    404
                </Heading>
                <Heading>Page not found</Heading>
                <NextButton href="/" variant="ghost" leftIcon={<MdHome />}>
                    Go home
                </NextButton>
            </Stack>
        </Container>
    );
};

export default Custom404;
