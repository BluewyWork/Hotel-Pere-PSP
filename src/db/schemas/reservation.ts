import { Schema } from 'mongoose'

export const reservationSchema = new Schema({
    _id: Schema.ObjectId,
    customerName: String,
    customerSurname: String,
    customerEmail: String,
    roomNumber: Number,
    pricePerNight: Number,
    checkIn: Schema.Types.Date,
    checkOut: Schema.Types.Date,
    reserved: Boolean,
    creationDate: Schema.Types.Date,
})
