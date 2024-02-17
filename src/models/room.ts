import { Types } from 'mongoose'

export interface ReservationDateRange {
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
    reservedDays: Array<ReservationDateRange>
}
