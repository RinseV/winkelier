import type { NextApiRequest, NextApiResponse } from 'next';
import { Jumbo, ProductData as JumboProductData } from 'jumbo-wrapper';
import { AH, ProductModel as AHProductModel } from 'albert-heijn-wrapper';
import { CommonProduct, Store } from './types';

const jumbo = new Jumbo();
const ah = new AH();

const mapJumboProductToCommonProduct = (product: JumboProductData): CommonProduct => {
    return {
        store: Store.JUMBO,
        id: product.id,
        title: product.title,
        url: `https://www.jumbo.com/${product.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-')}/${product.id}`,
        thumbnailUrl: product.imageInfo.primaryView[0].url,
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
        thumbnailUrl: product.images[product.images.length - 1].url,
        // Price is in euros, so multiply by 100 to get cents
        price: product.priceBeforeBonus * 100
    };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<CommonProduct[]>) {
    const term = req.query.term as string;
    const jumboProducts = await jumbo.product().getProductsFromName(term);
    const ahProducts = await ah.product().getProductsFromName(term);
    // Convert products to common product
    const jumboCommonProducts = jumboProducts.map((product) => mapJumboProductToCommonProduct(product.product.data));
    const ahCommonProducts = ahProducts.products.map((product) => mapAHProductToCommonProduct(product));
    // Merge products
    const commonProducts = [...jumboCommonProducts, ...ahCommonProducts];
    res.status(200).json(commonProducts);
}
