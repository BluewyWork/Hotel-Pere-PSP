import { Schema } from 'mongoose'

export const reservationSchema = new Schema({
    // _id: Schema.ObjectId,
    guestName: String,
    guestSurname: String,
    guestEmail: String,
    roomNumber: Number,
    pricePerNight: Number,
    checkIn: Schema.Types.Date,
    checkOut: Schema.Types.Date,
    reserved: Boolean,
    creationDate: Schema.Types.Date,
})
