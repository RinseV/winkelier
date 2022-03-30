import { Checkbox, HStack, Stack, Text, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { Diet } from '../../lib/api/types';
import { useSearchContext } from '../search/hooks/useSearchContext';

interface DietChecked {
    diet: Diet;
    checked: boolean;
}

export const DietFilter: React.VFC = () => {
    const { dietFilter, addDietToFilter, removeDietFromFilter } = useSearchContext();

    const [checkedItems, setCheckedItems] = useState<DietChecked[]>(() => {
        return Object.values(Diet).map((diet) => ({
            diet,
            checked: dietFilter.includes(diet)
        }));
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { checked } = e.target;
        // If checked, add to filter, else remove from filter
        if (checked) {
            addDietToFilter(checkedItems[index].diet);
        } else {
            removeDietFromFilter(checkedItems[index].diet);
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
            <Tooltip label="Results will follow these diets">
                <HStack spacing={1} alignItems="flex-start">
                    <Text fontWeight="bold">Diets</Text>
                    <MdInfoOutline />
                </HStack>
            </Tooltip>
            {/* Checkbox for every diet */}
            {checkedItems.map((item, index) => (
                <Checkbox
                    isChecked={checkedItems[index].checked}
                    key={item.diet}
                    onChange={(e) => handleChange(e, index)}
                >
                    {/* Replace underscore with space and capitalise first letter */}
                    {item.diet.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </Checkbox>
            ))}
        </Stack>
    );
};
