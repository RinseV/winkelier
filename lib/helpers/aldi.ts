import { ArticleModel } from 'aldi-wrapper';
import { CommonProduct, Store } from '../../pages/api/types';

export const mapAldiProductToCommonProduct = (product: ArticleModel): CommonProduct => {
    return {
        store: Store.ALDI,
        id: product.articleId,
        title: product.title,
        url: product.webDetailURL,
        thumbnailUrl: product.primaryImage.baseUrl,
        price: parseFloat(product.price) * 100
    };
};
