import { Bed } from "./bed";

export interface Room {
    number: number
    section: String
    pricePerNight: number
    bed: Array<Bed>
}