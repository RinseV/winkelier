import { ProductModel, DietFilter } from 'plus-wrapper';
import { CommonProduct, Diet, Store } from '../../pages/api/types';

// Translates to Plus filter, undefined if no filter, null if filter cannot be applied
export const translateDietToPlusDiets = (diet?: Diet[]): DietFilter[] | null => {
    if (!diet || diet?.length === 0) {
        return [];
    }
    // If diet includes anything but vegan and vegetarian, return null
    if (diet.some((d) => d !== Diet.VEGAN && d !== Diet.VEGETARIAN)) {
        return null;
    }
    const diets: DietFilter[] = [];
    diet.forEach((diet) => {
        switch (diet) {
            case Diet.VEGAN:
                diets.push(DietFilter.Vegan);
                break;
            case Diet.VEGETARIAN:
                diets.push(DietFilter.Vegetarian);
            default:
                break;
        }
    });
    return diets;
};

export const mapPlusProductToCommonProduct = (product: ProductModel): CommonProduct => {
    return {
        store: Store.PLUS,
        id: product.id,
        title: product.name,
        url: `https://www.plus.nl/product/${product.name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-')}-${
            product.unit
        }-${product.ratioBasePackingUnit.substring(0, product.ratioBasePackingUnit.indexOf('.'))}-${product.baseUnit}-${
            product.id
        }`,
        thumbnailUrl:
            `https://www.plus.nl/INTERSHOP/static/WFS/PLUS-Site/-/PLUS/nl_NL/product/L/${product.id}.png` ?? '',
        price: Math.round(parseFloat(product.listPrice) * 100)
    };
};
