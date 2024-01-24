export interface Bed {
    bedType: BedType
    bedSize: BedSize
}

export enum BedSize {
    Individual, Double, Auxiliar, Complementary
}

export enum BedType {
    Leather, Cotton, Bamboo
}