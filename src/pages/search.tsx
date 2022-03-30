import type { NextPage } from 'next';
import { Container } from '../components/layout/Container';
import { Search } from '../components/search/Search';

const SearchPage: NextPage = () => {
    return (
        <Container>
            <Search />
        </Container>
    );
};

export default SearchPage;
