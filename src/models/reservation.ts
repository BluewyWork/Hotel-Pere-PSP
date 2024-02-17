import { Types } from 'mongoose'

export interface Reservation {
    _id: Types.ObjectId
    _guestId: Types.ObjectId
    guestName: string
    guestSurname: string
    guestEmail: string
    roomNumber: Number
    pricePerNight: number
    checkIn: Date
    checkOut: Date
    creationDate: Date
}
