import { ArticleModel } from 'aldi-wrapper';
import { CommonProduct, Store } from './types';

export const mapAldiProductToCommonProduct = (product: ArticleModel): CommonProduct => {
    return {
        store: Store.ALDI,
        id: product.articleId,
        title: product.title,
        url: product.webDetailURL,
        thumbnailUrl: product.primaryImage.baseUrl,
        price: Math.round(parseFloat(product.price) * 100)
    };
};
