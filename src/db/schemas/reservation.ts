import { Schema } from 'mongoose'

export const reservationSchema = new Schema({
    guestName: String,
    guestSurname: String,
    guestEmail: String,
    roomNumber: Number,
    pricePerNight: Number,
    checkIn: Date,
    checkOut: Date,
    creationDate: {
        type: Date,
        default: Date.now,
    },
})
