import type { NextApiRequest, NextApiResponse } from 'next';
import { Jumbo, ProductData as JumboProductData } from 'jumbo-wrapper';
import { AH, ProductModel as AHProductModel } from 'albert-heijn-wrapper';
import { CommonProduct, Store } from './types';

const jumbo = new Jumbo();
const ah = new AH();

// Retrieves initial products from the stores
const retrieveProducts = async (term: string, excludeSupermarkets?: string): Promise<CommonProduct[]> => {
    // Get list of stores to retrieve products from
    const stores = translateExcludeTermToStores(excludeSupermarkets);
    let products: CommonProduct[] = [];
    if (stores.includes(Store.JUMBO)) {
        // Retrieve Jumbo products
        const jumboProducts = await jumbo.product().getProductsFromName(term);
        products = products.concat(
            jumboProducts.map((product) => mapJumboProductToCommonProduct(product.product.data))
        );
    }
    if (stores.includes(Store.ALBERT_HEIJN)) {
        // Retrieve AH products
        const ahProducts = await ah.product().getProductsFromName(term);
        products = products.concat(ahProducts.products.map((product) => mapAHProductToCommonProduct(product)));
    }
    // Merge products
    return products;
};

const mapJumboProductToCommonProduct = (product: JumboProductData): CommonProduct => {
    return {
        store: Store.JUMBO,
        id: product.id,
        title: product.title,
        url: `https://www.jumbo.com/${product.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-')}/${product.id}`,
        thumbnailUrl: product.imageInfo?.primaryView[0].url ?? '',
        price: product.prices.price.amount
    };
};

const mapAHProductToCommonProduct = (product: AHProductModel): CommonProduct => {
    return {
        store: Store.ALBERT_HEIJN,
        id: product.hqId.toString(),
        title: product.title,
        url: `https://www.ah.nl/producten/product/wi${product.webshopId}/${product.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+/g, '-')}`,
        thumbnailUrl: product.images[product.images.length - 1].url ?? '',
        // Price is in euros, so multiply by 100 to get cents
        price: product.priceBeforeBonus * 100
    };
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
    // Merge products
    const commonProducts = await retrieveProducts(term, excludeSupermarkets);
    // Filter products
    const filteredProducts = filterSupermarket(commonProducts, excludeSupermarkets);
    // Sort products
    const sortedCommonProducts = sortProducts(filteredProducts, sort);
    res.status(200).json(sortedCommonProducts);
}
