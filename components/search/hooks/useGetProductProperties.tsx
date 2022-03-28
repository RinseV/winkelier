import React, { useMemo } from 'react';
import { CommonProduct, Store } from '../../../pages/api/types';
import { AHIcon } from '../../brand/icons/AH';
import { AldiIcon } from '../../brand/icons/Aldi';
import { CoopIcon } from '../../brand/icons/Coop';
import { JumboIcon } from '../../brand/icons/Jumbo';

interface UseGetProductPropertiesReturn {
    colorScheme: string;
    icon: React.ReactElement | null;
    formattedPrice: string;
}

export const useGetProductProperties = (product: CommonProduct): UseGetProductPropertiesReturn => {
    const colorScheme = useMemo(() => {
        switch (product.store) {
            case Store.JUMBO:
                return 'jumbo';
            case Store.ALBERT_HEIJN:
                return 'ah';
            case Store.ALDI:
                return 'aldi';
            case Store.COOP:
                return 'coop';
            default:
                return 'brand';
        }
    }, [product.store]);

    const icon = useMemo(() => {
        switch (product.store) {
            case Store.JUMBO:
                return <JumboIcon boxSize="32px" />;
            case Store.ALBERT_HEIJN:
                return <AHIcon boxSize="32px" />;
            case Store.ALDI:
                return <AldiIcon boxSize="32px" />;
            case Store.COOP:
                return <CoopIcon boxSize="32px" />;
            default:
                return null;
        }
    }, [product.store]);

    const formattedPrice = useMemo(() => {
        return (product.price / 100).toLocaleString('nl-NL', {
            style: 'currency',
            currency: 'EUR'
        });
    }, [product.price]);

    return {
        colorScheme,
        icon,
        formattedPrice
    };
};
