import { ProductAllergenFilter, ProductData, ProductDietFilter } from 'jumbo-wrapper';
import { Allergens, CommonProduct, Diet, Store } from './types';

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
            case Diet.GLUTEN_FREE:
                diets.push(ProductDietFilter.GlutenIntolerant);
                break;
            case Diet.LACTOSE_FREE:
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

// Translates list of allergens to Jumbo-specific allergens
export const translateAllergensToJumboAllergens = (allergens?: Allergens[]): ProductAllergenFilter[] => {
    if (!allergens || allergens?.length === 0) {
        return [];
    }
    const allergensToFilter: ProductAllergenFilter[] = [];
    allergens.forEach((allergen) => {
        switch (allergen) {
            case Allergens.GLUTEN:
                allergensToFilter.push(ProductAllergenFilter.Gluten);
                break;
            case Allergens.LACTOSE:
                allergensToFilter.push(ProductAllergenFilter.Lactose);
                break;
            case Allergens.DIARY:
                allergensToFilter.push(ProductAllergenFilter.Diary);
                break;
            case Allergens.SOY:
                allergensToFilter.push(ProductAllergenFilter.Soy);
                break;
            case Allergens.PEANUTS:
                allergensToFilter.push(ProductAllergenFilter.Peanuts);
                break;
            case Allergens.NUTS:
                allergensToFilter.push(ProductAllergenFilter.Nuts);
                break;
            case Allergens.EGGS:
                allergensToFilter.push(ProductAllergenFilter.Eggs);
                break;
            default:
                break;
        }
    });
    return allergensToFilter;
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
