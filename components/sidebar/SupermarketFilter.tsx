import { Checkbox, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { mapStoreToFilter } from '../../lib/redux/api/search';
import { Store } from '../../pages/api/types';
import { useSearchContext } from '../search/hooks/useSearchContext';
import { StoreCheckbox } from './StoreCheckbox';

interface StoreChecked {
    store: Store;
    checked: boolean;
}

export const SupermarketFilter: React.VFC = () => {
    const { storeFilter, addStoreToFilter, removeStoreFromFilter } = useSearchContext();

    const [checkedItems, setCheckedItems] = useState<StoreChecked[]>(() => {
        return Object.values(Store).map((store) => ({
            store,
            checked: !storeFilter.includes(mapStoreToFilter(store))
        }));
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { checked } = e.target;
        // If not checked, add to filter, else remove from filter
        if (!checked) {
            addStoreToFilter(checkedItems[index].store);
        } else {
            removeStoreFromFilter(checkedItems[index].store);
        }
        // Update the checked state of the item
        setCheckedItems((prevState) => {
            const newState = [...prevState];
            newState[index].checked = checked;
            return newState;
        });
    };

    return (
        <Stack spacing={2}>
            <Text fontWeight="bold">Supermarkets</Text>
            {/* Checkbox for every store */}
            {checkedItems.map((item, index) => (
                <StoreCheckbox
                    key={item.store}
                    index={index}
                    store={item.store}
                    isChecked={checkedItems[index].checked}
                    onChange={handleChange}
                />
            ))}
        </Stack>
    );
};
