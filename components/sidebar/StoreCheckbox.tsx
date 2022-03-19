import { Checkbox, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { Store } from '../../pages/api/types';
import { useGetStoreProperties } from './hooks/useGetStoreProperties';

type StoreCheckboxProps = {
    store: Store;
    index: number;
    isChecked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
};

export const StoreCheckbox: React.VFC<StoreCheckboxProps> = ({ store, index, isChecked, onChange }) => {
    const { icon, colorScheme } = useGetStoreProperties(store);

    return (
        <Checkbox isChecked={isChecked} onChange={(e) => onChange(e, index)} colorScheme={colorScheme}>
            <HStack spacing={2}>
                {icon}
                <Text>{store}</Text>
            </HStack>
        </Checkbox>
    );
};
