import { FormControl, FormErrorIcon, FormErrorMessage, FormLabel, useColorModeValue } from '@chakra-ui/react';
import { PropsValue, Select } from 'chakra-react-select';
import React from 'react';
import { Control, Controller, FieldValues, Path, PathValue, UnpackNestedValue, useController } from 'react-hook-form';

type ControlledSelectProps<T extends FieldValues = FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    options: { value: any; label: string }[];
    defaultValue?: PropsValue<UnpackNestedValue<PathValue<T, Path<T>>>>;
    label?: string;
    placeholder?: string;
    isDisabled?: boolean;
    isRequired?: boolean;
};

export function ControlledSelect<T extends FieldValues = FieldValues>({
    name,
    control,
    options,
    defaultValue,
    label,
    placeholder,
    isDisabled,
    isRequired
}: ControlledSelectProps<T>) {
    const {
        fieldState: { invalid, error }
    } = useController({ control, name });

    const focusBorderColor = useColorModeValue('brand.500', 'brand.200');

    return (
        <FormControl isInvalid={invalid} isDisabled={isDisabled} isRequired={isRequired}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        focusBorderColor={focusBorderColor}
                        selectedOptionStyle="check"
                        placeholder={placeholder}
                        // @ts-ignore
                        options={options}
                        defaultValue={defaultValue}
                    />
                )}
            />
            <FormErrorMessage>
                <FormErrorIcon />
                {error ? error.message : null}
            </FormErrorMessage>
        </FormControl>
    );
}
