import { Flex, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SortOptions } from '../../lib/redux/api/search';
import { ControlledSelect } from '../form/ControlledSelect';

type FormData = {
    orderBy: {
        value: SortOptions;
        label: string;
    };
};

type SearchHeaderProps = {
    sort: SortOptions;
    setSort: React.Dispatch<React.SetStateAction<SortOptions>>;
};

export const SearchHeader: React.VFC<SearchHeaderProps> = ({ sort, setSort }) => {
    const router = useRouter();
    const term = router.query.term as string;

    const { control, watch } = useForm<FormData>({
        defaultValues: {
            orderBy: {
                value: sort,
                label: 'Price (low to high)'
            }
        }
    });

    const sortValue = watch('orderBy');
    useEffect(() => {
        setSort(sortValue.value);
    }, [setSort, sortValue]);

    return (
        <Flex direction={{ base: 'column', md: 'row' }} justifyContent="space-between" alignItems="center">
            <Heading>“{term}”</Heading>
            <Flex w="18rem" alignItems="center">
                <ControlledSelect<FormData>
                    name="orderBy"
                    control={control}
                    options={[
                        { value: '+price', label: 'Price (low to high)' },
                        { value: '-price', label: 'Price (high to low)' },
                        { value: '+title', label: 'Title (A-Z)' },
                        { value: '-title', label: 'Title (Z-A)' }
                    ]}
                />
            </Flex>
        </Flex>
    );
};
