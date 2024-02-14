import { Types } from 'mongoose'

export interface Room {
    _id: Types.ObjectId
    number: number
    description: string
    pricePerNight: number
    beds: number
    image: string
    reserved: boolean
    dateOccupied: Date[]
}
