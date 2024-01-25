export interface Bed {
    bedType: BedType
    bedSize: BedSize
}

export enum BedSize {
    Individual='individual',
    Double='double' ,
    Auxiliar= 'auxiliar',
    Complementary= 'complementary'
}

export enum BedType {
    Leather = 'leather',
    Cotton = 'cotton',
    Bamboo = 'bamboo'
}