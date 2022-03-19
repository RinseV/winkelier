import { ReactNode, useMemo } from 'react';
import { Store } from '../../../pages/api/types';
import { AHIcon } from '../../brand/icons/AH';
import { JumboIcon } from '../../brand/icons/Jumbo';

interface UseGetStorePropertiesReturn {
    colorScheme: string;
    icon: ReactNode;
}

export const useGetStoreProperties = (store: Store): UseGetStorePropertiesReturn => {
    const colorScheme = useMemo(() => {
        switch (store) {
            case Store.JUMBO:
                return 'jumbo';
            case Store.ALBERT_HEIJN:
                return 'ah';
            default:
                return 'brand';
        }
    }, [store]);

    const icon = useMemo(() => {
        switch (store) {
            case Store.JUMBO:
                return <JumboIcon />;
            case Store.ALBERT_HEIJN:
                return <AHIcon />;
            default:
                return null;
        }
    }, [store]);

    return {
        colorScheme,
        icon
    };
};
