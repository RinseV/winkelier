import {
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    Input,
    InputProps,
    useColorModeValue
} from '@chakra-ui/react';
import React from 'react';
import { Control, FieldValues, Path, RegisterOptions, useController } from 'react-hook-form';

type ControlledTextInputProps<T extends FieldValues = FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
    label?: string;
    isDisabled?: boolean;
    isRequired?: boolean;
    placeholder?: string;
} & Omit<InputProps, 'name' | 'control' | 'defaultValue' | 'label' | 'isDisabled' | 'isRequired' | 'placeholder'>;

export function ControlledTextInput<T extends FieldValues = FieldValues>({
    name,
    control,
    rules,
    label,
    isDisabled,
    isRequired,
    placeholder,
    ...props
}: ControlledTextInputProps<T>) {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { invalid, error }
    } = useController({
        name,
        control,
        rules
    });

    const focusColor = useColorModeValue('brand.500', 'brand.200');

    return (
        <FormControl isInvalid={invalid} isDisabled={isDisabled} isRequired={isRequired}>
            {label ? <FormLabel htmlFor={name}>{label}</FormLabel> : null}
            <Input
                isRequired={isRequired}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                ref={ref}
                focusBorderColor={focusColor}
                {...props}
            />
            <FormErrorMessage>
                <FormErrorIcon />
                {error ? error.message : null}
            </FormErrorMessage>
        </FormControl>
    );
}
