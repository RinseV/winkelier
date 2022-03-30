import { ProductModel, ProductPropertyFilter } from 'albert-heijn-wrapper';
import { Allergens, CommonProduct, Diet, Store } from './types';

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
            case Diet.GLUTEN_FREE:
                // AH makes no distinction between gluten free and gluten intolerant
                diets.push(ProductPropertyFilter.GlutenFree);
                break;
            case Diet.LACTOSE_FREE:
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

// Translates list of allergens to AH-specific allergens
export const translateAllergensToAHAllergens = (allergens?: Allergens[]): ProductPropertyFilter[] => {
    if (!allergens || allergens?.length === 0) {
        return [];
    }
    const allergensToFilter: ProductPropertyFilter[] = [];
    allergens.forEach((allergen) => {
        switch (allergen) {
            case Allergens.GLUTEN:
                allergensToFilter.push(ProductPropertyFilter.GlutenFree);
                break;
            case Allergens.LACTOSE:
                allergensToFilter.push(ProductPropertyFilter.LactoseFree);
                break;
            case Allergens.DIARY:
                allergensToFilter.push(ProductPropertyFilter.MilkFree);
                break;
            case Allergens.SOY:
                allergensToFilter.push(ProductPropertyFilter.SoyFree);
                break;
            case Allergens.PEANUTS:
                allergensToFilter.push(ProductPropertyFilter.PeanutFree);
                break;
            case Allergens.NUTS:
                allergensToFilter.push(ProductPropertyFilter.NutFree);
                break;
            case Allergens.EGGS:
                allergensToFilter.push(ProductPropertyFilter.EggFree);
                break;
            default:
                break;
        }
    });
    return allergensToFilter;
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
        price: Math.round(product.priceBeforeBonus * 100)
    };
};
