import { Checkbox, HStack, Stack, Text, Tooltip } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdInfo, MdInfoOutline } from 'react-icons/md';
import { Allergens } from '../../lib/api/types';
import { useSearchContext } from '../search/hooks/useSearchContext';

interface AllergenChecked {
    allergen: Allergens;
    checked: boolean;
}

export const AllergenFilter: React.VFC = () => {
    const { allergenFilter, addAllergenToFilter, removeAllergenFromFilter } = useSearchContext();

    const [checkedItems, setCheckedItems] = useState<AllergenChecked[]>(() => {
        return Object.values(Allergens).map((allergen) => ({
            allergen,
            checked: allergenFilter.includes(allergen)
        }));
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { checked } = e.target;
        // If checked, add to filter, else remove from filter
        if (checked) {
            addAllergenToFilter(checkedItems[index].allergen);
        } else {
            removeAllergenFromFilter(checkedItems[index].allergen);
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
            <Tooltip label="Allergens to exclude from results">
                <HStack spacing={1} alignItems="flex-start">
                    <Text fontWeight="bold">Allergens</Text>
                    <MdInfoOutline />
                </HStack>
            </Tooltip>
            {/* Checkbox for every allergen */}
            {checkedItems.map((item, index) => (
                <Checkbox
                    isChecked={checkedItems[index].checked}
                    key={item.allergen}
                    onChange={(e) => handleChange(e, index)}
                >
                    {/* Replace underscore with space and capitalise first letter */}
                    {item.allergen.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </Checkbox>
            ))}
        </Stack>
    );
};
