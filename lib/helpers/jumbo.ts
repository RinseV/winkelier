import { ProductData, ProductDietFilter, ProductFilter } from 'jumbo-wrapper';
import { CommonProduct, Diet, Store } from '../../pages/api/types';

// Translates list of diets to Jumbo-specific diets
export const translateDietToJumboDiets = (diet?: Diet[]): ProductDietFilter[] => {
    // Every diet corresponds to a Jumbo diet
    if (!diet || diet?.length === 0) {
        return [];
    }
    const diets: ProductDietFilter[] = [];
    diet.forEach((diet) => {
        switch (diet) {
            case Diet.ORGANIC:
                diets.push(ProductDietFilter.Bio);
                break;
            case Diet.VEGAN:
                diets.push(ProductDietFilter.Vegan);
                break;
            case Diet.VEGETARIAN:
                diets.push(ProductDietFilter.Vegetarian);
                break;
            case Diet.GLUTEN_INTOLERANT:
                diets.push(ProductDietFilter.GlutenIntolerant);
                break;
            case Diet.LACTOSE_INTOLERANT:
                diets.push(ProductDietFilter.LactoseIntolerant);
                break;
            case Diet.LOW_SUGAR:
                diets.push(ProductDietFilter.LowSugar);
                break;
            case Diet.LOW_FAT:
                diets.push(ProductDietFilter.LowFat);
                break;
            default:
                break;
        }
    });
    return diets;
};

// Maps Jumbo products to a common product
export const mapJumboProductToCommonProduct = (product: ProductData): CommonProduct => {
    return {
        store: Store.JUMBO,
        id: product.id,
        title: product.title,
        url: `https://www.jumbo.com/${product.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-')}/${product.id}`,
        thumbnailUrl: product.imageInfo?.primaryView[0].url ?? '',
        price: product.prices.price.amount
    };
};
