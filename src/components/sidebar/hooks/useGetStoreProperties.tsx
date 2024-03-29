import { ReactNode, useMemo } from 'react';
import { Store } from '../../../lib/api/types';
import { AHIcon } from '../../brand/icons/AH';
import { AldiIcon } from '../../brand/icons/Aldi';
import { CoopIcon } from '../../brand/icons/Coop';
import { JumboIcon } from '../../brand/icons/Jumbo';
import { PlusIcon } from '../../brand/icons/Plus';

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
            case Store.ALDI:
                return 'aldi';
            case Store.COOP:
                return 'coop';
            case Store.PLUS:
                return 'plus';
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
            case Store.ALDI:
                return <AldiIcon />;
            case Store.COOP:
                return <CoopIcon />;
            case Store.PLUS:
                return <PlusIcon />;
            default:
                return null;
        }
    }, [store]);

    return {
        colorScheme,
        icon
    };
};
