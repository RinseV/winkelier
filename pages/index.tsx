import type { NextPage } from 'next';
import { DarkThemeToggle } from '../components/common/DarkThemeToggle';
import { Home } from '../components/home/Home';
import { Container } from '../components/layout/Container';

const HomePage: NextPage = () => {
    return (
        <Container>
            <DarkThemeToggle position="fixed" top="1rem" right="1rem" />
            <Home />
        </Container>
    );
};

export default HomePage;
