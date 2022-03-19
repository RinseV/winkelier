import { Checkbox, CheckboxProps } from '@chakra-ui/react';
import React from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

type ControlledCheckboxProps<T extends FieldValues = FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    label: string;
} & Omit<CheckboxProps, 'name' | 'control'>;

export function ControlledCheckbox<T extends FieldValues = FieldValues>({
    name,
    control,
    label,
    ...props
}: ControlledCheckboxProps<T>) {
    const {
        field: { value, onChange }
    } = useController({ control, name });

    return (
        <Checkbox isChecked={value} onChange={onChange} {...props}>
            {label}
        </Checkbox>
    );
}
