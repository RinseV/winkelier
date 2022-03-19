export enum Store {
    JUMBO = 'Jumbo',
    ALBERT_HEIJN = 'Albert Heijn'
}

export enum Diet {
    ORGANIC = 'organic',
    VEGAN = 'vegan',
    VEGETARIAN = 'vegetarian',
    GLUTEN_INTOLERANT = 'gluten_intolerant',
    LACTOSE_INTOLERANT = 'lactose_intolerant',
    LOW_SUGAR = 'low_sugar',
    LOW_FAT = 'low_fat'
}

export type CommonProduct = {
    store: Store;
    id: string;
    title: string;
    url: string;
    thumbnailUrl: string;
    price: number;
};
