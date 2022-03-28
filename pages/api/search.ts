import { AH } from 'albert-heijn-wrapper';
import { Jumbo } from 'jumbo-wrapper';
import { Aldi } from 'aldi-wrapper';
import { Coop } from 'coop-wrapper';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
    mapAHProductToCommonProduct,
    translateAllergensToAHAllergens,
    translateDietToAHDiets
} from '../../lib/helpers/ah';
import {
    mapJumboProductToCommonProduct,
    translateAllergensToJumboAllergens,
    translateDietToJumboDiets
} from '../../lib/helpers/jumbo';
import { Allergens, CommonProduct, Diet, Store } from './types';
import { mapAldiProductToCommonProduct } from '../../lib/helpers/aldi';
import {
    mapCoopProductToCommonProduct,
    translateAllergensToCoopAllergens,
    translateDietToCoopDiets
} from '../../lib/helpers/coop';

const jumbo = new Jumbo();
const ah = new AH();
const aldi = new Aldi();
const coop = new Coop();

// Translates diet query into list of Diets to include in the final result
const translateDietQueryToDiet = (dietQuery?: string): Diet[] => {
    if (!dietQuery) {
        return [];
    }
    // Split diets into array
    const diets = dietQuery.split(',');
    // Translate to enum
    const enums = diets.map((diet) => {
        switch (diet) {
            case 'organic':
                return Diet.ORGANIC;
            case 'vegan':
                return Diet.VEGAN;
            case 'vegetarian':
                return Diet.VEGETARIAN;
            case 'gluten_free':
                return Diet.GLUTEN_FREE;
            case 'lactose_free':
                return Diet.LACTOSE_FREE;
            case 'low_sugar':
                return Diet.LOW_SUGAR;
            case 'low_fat':
                return Diet.LOW_FAT;
            default:
                return undefined;
        }
    });
    // Only return enums that are defined, otherwise return empty array
    return enums.filter((diet) => diet !== undefined) as Diet[];
};

// Translates allergens query into list of Allergens to include in the final result
const translateAllergenQueryToAllergens = (allergenQuery?: string): Allergens[] => {
    if (!allergenQuery) {
        return [];
    }
    // Split allergens into array
    const allergens = allergenQuery.split(',');
    // Translate to enum
    const enums = allergens.map((allergen) => {
        switch (allergen) {
            case 'gluten':
                return Allergens.GLUTEN;
            case 'lactose':
                return Allergens.LACTOSE;
            case 'dairy':
                return Allergens.DIARY;
            case 'soy':
                return Allergens.SOY;
            case 'peanuts':
                return Allergens.PEANUTS;
            case 'nuts':
                return Allergens.NUTS;
            case 'eggs':
                return Allergens.EGGS;
            default:
                return undefined;
        }
    });
    // Only return enums that are defined, otherwise return empty array
    return enums.filter((allergen) => allergen !== undefined) as Allergens[];
};

// Retrieves initial products from the stores
const retrieveProducts = async (
    term: string,
    excludeSupermarkets?: string,
    diets?: Diet[],
    allergens?: Allergens[]
): Promise<CommonProduct[]> => {
    // Get list of stores to retrieve products from
    const stores = translateExcludeTermToStores(excludeSupermarkets);
    let products: CommonProduct[] = [];
    if (stores.includes(Store.JUMBO)) {
        const jumboDiets = translateDietToJumboDiets(diets);
        const jumboAllergens = translateAllergensToJumboAllergens(allergens);
        // Retrieve Jumbo products
        try {
            const jumboProducts = await jumbo.product().getProductsFromName(term, {
                limit: 10,
                filters: {
                    diet: jumboDiets,
                    allergens: jumboAllergens
                }
            });
            products = products.concat(
                jumboProducts.map((product) => mapJumboProductToCommonProduct(product.product.data))
            );
        } catch (e) {
            console.error(e);
        }
    }
    if (stores.includes(Store.ALBERT_HEIJN)) {
        const ahDiets = translateDietToAHDiets(diets);
        const ahAllergens = translateAllergensToAHAllergens(allergens);
        // Retrieve AH products
        try {
            const ahProducts = await ah.product().getProductsFromName(term, {
                size: 10,
                filter: {
                    property: [...ahDiets, ...ahAllergens]
                }
            });
            products = products.concat(ahProducts.products.map((product) => mapAHProductToCommonProduct(product)));
        } catch (e) {
            console.error(e);
        }
    }
    if (stores.includes(Store.ALDI) && (!diets || diets?.length === 0) && (!allergens || allergens?.length === 0)) {
        // Retrieve Aldi products
        try {
            const aldiProducts = await aldi.product().getProductsFromName(term);
            // Only keep first 10 products
            products = products.concat(
                aldiProducts.articles.slice(0, 10).map((article) => mapAldiProductToCommonProduct(article))
            );
        } catch (e) {
            console.error(e);
        }
    }
    if (stores.includes(Store.COOP)) {
        const coopDiet = translateDietToCoopDiets(diets);
        const coopAllergen = translateAllergensToCoopAllergens(allergens);
        // Retrieve coop products
        try {
            const coopProducts = await coop.product().getProductsFromName(term, {
                amount: 10,
                filters: coopDiet ? coopDiet : coopAllergen ? coopAllergen : undefined
            });
            products = products.concat(coopProducts.elements.map((element) => mapCoopProductToCommonProduct(element)));
        } catch (e) {
            console.error(e);
        }
    }
    // Merge products
    return products;
};

// Translates exclude query into list of Stores to include in the final result
const translateExcludeTermToStores = (excludeSupermarkets?: string): Store[] => {
    // Default is all
    let result = Object.values(Store);
    if (!excludeSupermarkets) {
        return result;
    }
    // Split supermarkets into array
    const supermarkets = excludeSupermarkets.split(',');
    if (supermarkets.includes('jumbo')) {
        // Exclude Jumbo
        result = result.filter((store) => store !== Store.JUMBO);
    }
    if (supermarkets.includes('ah')) {
        // Exclude AH
        result = result.filter((store) => store !== Store.ALBERT_HEIJN);
    }
    if (supermarkets.includes('aldi')) {
        // Exclude Aldi
        result = result.filter((store) => store !== Store.ALDI);
    }
    return result;
};

// Excludes given supermarkets from final result
const filterSupermarket = (products: CommonProduct[], excludeSupermarkets?: string): CommonProduct[] => {
    // Default is all
    if (!excludeSupermarkets) {
        return products;
    }
    let result = products;
    // Get list of Stores to include
    const stores = translateExcludeTermToStores(excludeSupermarkets);
    // Filter products
    result = result.filter((product) => stores.includes(product.store));
    return result;
};

// Sorts products according to sort query
const sortProducts = (products: CommonProduct[], sort?: string): CommonProduct[] => {
    // Default is price ascending
    let result = products;
    // Split sort terms into array
    const sortTerms = sort ? sort.split(',') : [];
    // Find term with price
    const priceTerm = sortTerms.find((term) => term.endsWith('price'));
    // Find term with title
    const titleTerm = sortTerms.find((term) => term.endsWith('title'));
    // If price term is found, sort by price
    if (priceTerm) {
        // Either + or -
        const direction = priceTerm.startsWith('-') ? -1 : 1;
        result = result.sort((a, b) => (a.price - b.price) * direction);
    } else if (titleTerm) {
        const direction = titleTerm.startsWith('-') ? -1 : 1;
        result = result.sort((a, b) => (a.title > b.title ? 1 : -1) * direction);
    } else {
        result = result.sort((a, b) => a.price - b.price);
    }
    return result;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<CommonProduct[]>) {
    const term = req.query.term as string;
    const sort = req.query.sort as string;
    const excludeSupermarkets = req.query.excludeSupermarkets as string;
    const diet = req.query.diet as string;
    const allergen = req.query.allergen as string;
    const diets = translateDietQueryToDiet(diet);
    const allergens = translateAllergenQueryToAllergens(allergen);
    // Merge products
    const commonProducts = await retrieveProducts(term, excludeSupermarkets, diets, allergens);
    // Filter products
    const filteredProducts = filterSupermarket(commonProducts, excludeSupermarkets);
    // Sort products
    const sortedCommonProducts = sortProducts(filteredProducts, sort);
    res.status(200).json(sortedCommonProducts);
}
