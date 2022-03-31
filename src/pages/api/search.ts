import { AH } from 'albert-heijn-wrapper';
import { Jumbo } from 'jumbo-wrapper';
import { Aldi } from 'aldi-wrapper';
import { Coop } from 'coop-wrapper';
import { Plus } from 'plus-wrapper';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';
import logger from '../../lib/logger/logger';
import { mapAHProductToCommonProduct, translateAllergensToAHAllergens, translateDietToAHDiets } from '../../lib/api/ah';
import {
    mapJumboProductToCommonProduct,
    translateAllergensToJumboAllergens,
    translateDietToJumboDiets
} from '../../lib/api/jumbo';
import { Allergens, CommonProduct, Diet, Store } from '../../lib/api/types';
import { mapAldiProductToCommonProduct } from '../../lib/api/aldi';
import {
    mapCoopProductToCommonProduct,
    translateAllergensToCoopAllergens,
    translateDietToCoopDiets
} from '../../lib/api/coop';
import { mapPlusProductToCommonProduct, translateDietToPlusDiets } from '../../lib/api/plus';

const jumbo = new Jumbo();
const ah = new AH();
const aldi = new Aldi();
const coop = new Coop();
const plus = new Plus();

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
                limit: 9,
                filters: {
                    diet: jumboDiets,
                    allergens: jumboAllergens
                }
            });
            logger.info(`Retrieved ${jumboProducts.length} products from Jumbo for term ${term}`);
            products = products.concat(
                jumboProducts.map((product) => mapJumboProductToCommonProduct(product.product.data))
            );
        } catch (e) {
            console.error(e);
            if (axios.isAxiosError(e)) {
                const error = e as AxiosError;
                logger.error(`Error retrieving products from Coop for term ${term}: ${error.message}`);
            }
            // Skip Jumbo
            stores.splice(stores.indexOf(Store.JUMBO), 1);
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
            logger.info(`Retrieved ${ahProducts.products.length} products from Albert Heijn for term ${term}`);
            products = products.concat(ahProducts.products.map((product) => mapAHProductToCommonProduct(product)));
        } catch (e) {
            console.error(e);
            if (axios.isAxiosError(e)) {
                const error = e as AxiosError;
                logger.error(`Error retrieving products from Coop for term ${term}: ${error.message}`);
            }
            // Skip AH
            stores.splice(stores.indexOf(Store.ALBERT_HEIJN), 1);
        }
    }
    // Aldi does not have any diet or allergen filters, so don't include Aldi if diets or allergens are specified
    if (stores.includes(Store.ALDI) && (!diets || diets?.length === 0) && (!allergens || allergens?.length === 0)) {
        // Retrieve Aldi products
        try {
            const aldiProducts = await aldi.product().getProductsFromName(term);
            logger.info(`Retrieved ${aldiProducts.articles.length} products from Aldi for term ${term}`);
            // Only keep first 10 products
            products = products.concat(
                aldiProducts.articles.slice(0, 10).map((article) => mapAldiProductToCommonProduct(article))
            );
        } catch (e) {
            console.error(e);
            if (axios.isAxiosError(e)) {
                const error = e as AxiosError;
                logger.error(`Error retrieving products from Coop for term ${term}: ${error.message}`);
            }
            // Skip Aldi
            stores.splice(stores.indexOf(Store.ALDI), 1);
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
            logger.info(`Retrieved ${coopProducts.elements.length} products from Coop for term ${term}`);
            products = products.concat(coopProducts.elements.map((element) => mapCoopProductToCommonProduct(element)));
        } catch (e) {
            console.error(e);
            if (axios.isAxiosError(e)) {
                const error = e as AxiosError;
                logger.error(`Error retrieving products from Coop for term ${term}: ${error.message}`);
            }
            // Skip Coop
            stores.splice(stores.indexOf(Store.COOP), 1);
        }
    }
    // Plus does not have allergen filters, so don't include Plus if allergens are specified
    if (stores.includes(Store.PLUS) && (!allergens || allergens?.length === 0)) {
        const plusDiet = translateDietToPlusDiets(diets);
        if (plusDiet !== null) {
            // Retrieve plus products
            try {
                let initialPlusProducts;
                if (plusDiet.length > 0) {
                    initialPlusProducts = await plus.product().getProductsFromName(term, {
                        diet: plusDiet,
                        limit: 10
                    });
                } else {
                    initialPlusProducts = await plus.product().getProductsFromName(term, {
                        limit: 10
                    });
                }
                // Also retrieve every individual product since Plus does not return them in a single call
                const plusProducts = await Promise.all(
                    initialPlusProducts.items.map((item) => plus.product().getProductFromId(parseInt(item.itemno, 10)))
                );
                logger.info(`Retrieved ${plusProducts.length} products from Plus for term ${term}`);
                products = products.concat(plusProducts.map((product) => mapPlusProductToCommonProduct(product)));
            } catch (e) {
                console.error(e);
                if (axios.isAxiosError(e)) {
                    const error = e as AxiosError;
                    logger.error(`Error retrieving products from Coop for term ${term}: ${error.message}`);
                }
                // Skip Plus
                stores.splice(stores.indexOf(Store.PLUS), 1);
            }
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
    if (supermarkets.includes('coop')) {
        // Exclude Coop
        result = result.filter((store) => store !== Store.COOP);
    }
    if (supermarkets.includes('plus')) {
        // Exclude Plus
        result = result.filter((store) => store !== Store.PLUS);
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

    logger.info(
        `Received request: { term: ${term}, sort: ${sort}, excludeSupermarkets: ${excludeSupermarkets}, diet: ${diet}, allergen: ${allergen} }`
    );

    const diets = translateDietQueryToDiet(diet);
    const allergens = translateAllergenQueryToAllergens(allergen);
    // Merge products
    const commonProducts = await retrieveProducts(term, excludeSupermarkets, diets, allergens);
    // Remove products that have no price
    const products = commonProducts.filter((product) => isNaN(product.price) === false);
    // Filter products
    const filteredProducts = filterSupermarket(products, excludeSupermarkets);
    // Sort products
    const sortedCommonProducts = sortProducts(filteredProducts, sort);
    logger.info(`Returning ${sortedCommonProducts.length} products for term ${term}`);
    res.status(200).json(sortedCommonProducts);
}
