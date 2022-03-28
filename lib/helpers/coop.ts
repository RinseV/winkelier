import { ProductModel, ProductFilter } from 'coop-wrapper';
import { Allergens, CommonProduct, Diet, Store } from '../../pages/api/types';

// Translates to Coop filter, undefined if no filter, null if filter cannot be applied
export const translateDietToCoopDiets = (diet?: Diet[]): ProductFilter | undefined | null => {
    if (!diet || diet?.length === 0) {
        return undefined;
    }
    let dietToFilter: ProductFilter | null = null;
    diet.forEach((diet) => {
        switch (diet) {
            case Diet.ORGANIC:
                dietToFilter = ProductFilter.Organic;
                break;
            case Diet.GLUTEN_FREE:
                dietToFilter = ProductFilter.GlutenFree;
                break;
            case Diet.LACTOSE_FREE:
                dietToFilter = ProductFilter.LactoseFree;
                break;
            default:
                break;
        }
    });
    return dietToFilter;
};

// Translates to Coop filter, undefined if no filter, null if filter cannot be applied
export const translateAllergensToCoopAllergens = (allergens?: Allergens[]): ProductFilter | undefined | null => {
    if (!allergens || allergens?.length === 0) {
        return undefined;
    }
    let allergenToFilter: ProductFilter | null = null;
    allergens.forEach((allergen) => {
        switch (allergen) {
            case Allergens.GLUTEN:
                allergenToFilter = ProductFilter.GlutenFree;
                break;
            case Allergens.LACTOSE:
                allergenToFilter = ProductFilter.LactoseFree;
                break;
            default:
                break;
        }
    });
    return allergenToFilter;
};

export const mapCoopProductToCommonProduct = (product: ProductModel): CommonProduct => {
    return {
        store: Store.COOP,
        id: product.sku,
        title: product.name,
        url: `https://www.coop.nl/product/${product.sku}/${product.name.replace(/[^a-zA-Z0-9]+/g, '-')}`,
        thumbnailUrl: product.images[0].effectiveUrl ?? '',
        price: Math.round(product.listPrice.value * 100)
    };
};
