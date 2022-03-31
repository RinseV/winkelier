import { Button, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { MdSearch } from 'react-icons/md';
import { ControlledTextInput } from '../form/ControlledTextInput';

type FormData = {
    term: string;
};

export const SearchForm: React.VFC = () => {
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
        await router.push(`/search?term=${data.term}`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '70%' }}>
            <Stack alignItems="center" spacing={4}>
                <ControlledTextInput<FormData>
                    control={control}
                    name="term"
                    rules={{
                        required: 'Please enter a search term'
                    }}
                    placeholder="Start searching..."
                />
                <Button type="submit" leftIcon={<MdSearch size="20px" />} w="full" isLoading={isSubmitting}>
                    Search
                </Button>
            </Stack>
        </form>
    );
};
