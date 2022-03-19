import { AH } from 'albert-heijn-wrapper';
import { Jumbo } from 'jumbo-wrapper';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mapAHProductToCommonProduct, translateDietToAHDiets } from '../../lib/helpers/ah';
import { mapJumboProductToCommonProduct, translateDietToJumboDiets } from '../../lib/helpers/jumbo';
import { CommonProduct, Diet, Store } from './types';

const jumbo = new Jumbo();
const ah = new AH();

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
            case 'gluten_intolerant':
                return Diet.GLUTEN_INTOLERANT;
            case 'lactose_intolerant':
                return Diet.LACTOSE_INTOLERANT;
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

// Retrieves initial products from the stores
const retrieveProducts = async (
    term: string,
    excludeSupermarkets?: string,
    diets?: Diet[]
): Promise<CommonProduct[]> => {
    // Get list of stores to retrieve products from
    const stores = translateExcludeTermToStores(excludeSupermarkets);
    let products: CommonProduct[] = [];
    if (stores.includes(Store.JUMBO)) {
        const jumboDiets = translateDietToJumboDiets(diets);
        // Retrieve Jumbo products
        try {
            const jumboProducts = await jumbo.product().getProductsFromName(term, 0, 10, {
                diet: jumboDiets
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
        // Retrieve AH products
        try {
            const ahProducts = await ah.product().getProductsFromName(term, {
                property: ahDiets
            });
            products = products.concat(ahProducts.products.map((product) => mapAHProductToCommonProduct(product)));
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
    const diets = translateDietQueryToDiet(diet);
    // Merge products
    const commonProducts = await retrieveProducts(term, excludeSupermarkets, diets);
    // Filter products
    const filteredProducts = filterSupermarket(commonProducts, excludeSupermarkets);
    // Sort products
    const sortedCommonProducts = sortProducts(filteredProducts, sort);
    res.status(200).json(sortedCommonProducts);
}
