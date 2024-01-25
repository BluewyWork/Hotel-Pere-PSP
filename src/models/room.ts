import { Bed } from "./bed";

export interface Room {
    number: number
    section: String
    pricePerNight: number
    reserved?: boolean
    bed: Array<Bed>
}