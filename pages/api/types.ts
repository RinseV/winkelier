export enum Store {
    JUMBO = 'Jumbo',
    ALBERT_HEIJN = 'Albert Heijn'
}

export type CommonProduct = {
    store: Store;
    id: string;
    title: string;
    url: string;
    thumbnailUrl: string;
    price: number;
};
