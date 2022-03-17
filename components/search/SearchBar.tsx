import { Button, Flex, HStack, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { MdSearch } from 'react-icons/md';
import { ControlledTextInput } from '../form/ControlledTextInput';

type FormData = {
    term: string;
};

export const SearchBar: React.VFC = () => {
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<FormData>({
        defaultValues: {
            term: ''
        }
    });

    const onSubmit = async (data: FormData) => {
        if (data.term === '') {
            return;
        }
        await router.push(`/search?term=${data.term}`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <HStack spacing={2} alignItems="flex-start">
                <ControlledTextInput<FormData> control={control} name="term" placeholder="Enter a search term..." />
                <IconButton type="submit" aria-label="Search" icon={<MdSearch size="20px" />} isLoading={isSubmitting}>
                    Search
                </IconButton>
            </HStack>
        </form>
    );
};
