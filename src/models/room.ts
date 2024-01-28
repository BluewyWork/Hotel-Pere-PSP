import { Bed } from './bed'

export interface Room {
    number: number
    section?: String
    pricePerNight: number
    reserved: Reserved
    image?: String
    bed: Array<Bed>
}

export enum Reserved{
    Cancelled = 'cancelled',
    Confirm = 'confirmed',
    Pending = 'pending'
}