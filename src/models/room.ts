import { Types } from 'mongoose'

interface Reservation {
    _reservationId: Types.ObjectId
    checkIn: Date
    checkOut: Date
}

export interface Room {
    number: number
    description: string
    pricePerNight: number
    beds: number
    image: string
    reservedDays: Array<Reservation>
}
