import { ProductFilter, ProductModel, ProductPropertyFilter } from 'albert-heijn-wrapper';
import { CommonProduct, Diet, Store } from '../../pages/api/types';

// Translates list of diets to AH-specific diets
export const translateDietToAHDiets = (diet?: Diet[]): ProductPropertyFilter[] => {
    if (!diet || diet?.length === 0) {
        return [];
    }
    const diets: ProductPropertyFilter[] = [];
    diet.forEach((diet) => {
        switch (diet) {
            case Diet.ORGANIC:
                diets.push(ProductPropertyFilter.Organic);
                break;
            case Diet.VEGAN:
                diets.push(ProductPropertyFilter.Vegan);
                break;
            case Diet.VEGETARIAN:
                diets.push(ProductPropertyFilter.Vegeterian);
                break;
            case Diet.GLUTEN_INTOLERANT:
                // AH makes no distinction between gluten free and gluten intolerant
                diets.push(ProductPropertyFilter.GlutenFree);
                break;
            case Diet.LACTOSE_INTOLERANT:
                // AH makes no distinction between lactose free and lactose intolerant
                diets.push(ProductPropertyFilter.LactoseFree);
                break;
            case Diet.LOW_SUGAR:
                diets.push(ProductPropertyFilter.LowSugarDiet);
                break;
            case Diet.LOW_FAT:
                diets.push(ProductPropertyFilter.LowFatDiet);
                break;
            default:
                break;
        }
    });
    return diets;
};

// Maps AH products to a common product
export const mapAHProductToCommonProduct = (product: ProductModel): CommonProduct => {
    return {
        store: Store.ALBERT_HEIJN,
        id: product.hqId.toString(),
        title: product.title,
        url: `https://www.ah.nl/producten/product/wi${product.webshopId}/${product.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+/g, '-')}`,
        thumbnailUrl: product.images[product.images.length - 1]?.url ?? '',
        // Price is in euros, so multiply by 100 to get cents
        price: product.priceBeforeBonus * 100
    };
};
