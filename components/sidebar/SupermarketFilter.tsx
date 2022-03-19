import { Checkbox, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { mapStoreToFilter, StoreFilter } from '../../lib/redux/api/search';
import { Store } from '../../pages/api/types';

type Supermarkets = {
    store: Store;
    checked: boolean;
    filter: StoreFilter;
};

const options: Supermarkets[] = Object.values(Store).map((store) => ({
    store,
    checked: true,
    filter: mapStoreToFilter(store)
}));

type SupermarketFilterProps = {
    filter: StoreFilter[];
    setFilter: React.Dispatch<React.SetStateAction<StoreFilter[]>>;
};

export const SupermarketFilter: React.VFC<SupermarketFilterProps> = ({ filter, setFilter }) => {
    const [checkedItems, setCheckedItems] = useState<Supermarkets[]>(() => {
        return options.map((option) => ({
            ...option,
            checked: !filter.includes(option.filter)
        }));
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { checked } = e.target;
        // Update state for the specific item
        setCheckedItems((prevState) => {
            const newState = [...prevState];
            newState[index].checked = checked;
            return newState;
        });
        // If not checked, add to filter
        if (!checked) {
            setFilter((prevState) => {
                const newState = [...prevState];
                newState.push(options[index].filter);
                return newState;
            });
        } else {
            // If checked, remove from filter
            setFilter((prevState) => {
                const newState = [...prevState];
                newState.splice(newState.indexOf(options[index].filter), 1);
                return newState;
            });
        }
    };

    return (
        <Stack spacing={2}>
            <Text fontWeight="bold">Supermarkets</Text>
            {/* Checkbox for every store */}
            {checkedItems.map((item, index) => (
                <Checkbox
                    isChecked={checkedItems[index].checked}
                    key={item.store}
                    onChange={(e) => handleChange(e, index)}
                >
                    {item.store}
                </Checkbox>
            ))}
        </Stack>
    );
};
