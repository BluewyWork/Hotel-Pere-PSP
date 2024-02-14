import { Schema } from 'mongoose'

export const reservationSchema = new Schema({
    // _id: Schema.ObjectId,
    guestName: String,
    guestSurname: String,
    guestEmail: String,
    roomNumber: Number,
    pricePerNight: Number,
    checkIn: Date,
    checkOut: Date,
    reserved: Boolean,
    creationDate: Date,
})
