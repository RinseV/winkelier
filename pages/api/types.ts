export enum Store {
    JUMBO = 'Jumbo',
    ALBERT_HEIJN = 'Albert Heijn',
    ALDI = 'Aldi',
    COOP = 'Coop',
    PLUS = 'Plus'
}

export enum Diet {
    ORGANIC = 'organic',
    VEGAN = 'vegan',
    VEGETARIAN = 'vegetarian',
    GLUTEN_FREE = 'gluten_free',
    LACTOSE_FREE = 'lactose_free',
    LOW_SUGAR = 'low_sugar',
    LOW_FAT = 'low_fat'
}

export enum Allergens {
    GLUTEN = 'gluten',
    LACTOSE = 'lactose',
    DIARY = 'diary',
    SOY = 'soy',
    PEANUTS = 'peanuts',
    NUTS = 'nuts',
    EGGS = 'eggs'
}

export type CommonProduct = {
    store: Store;
    id: string;
    title: string;
    url: string;
    thumbnailUrl: string;
    price: number;
};
