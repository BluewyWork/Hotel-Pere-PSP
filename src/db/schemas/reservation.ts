import mongoose from 'mongoose'
const { Schema } = mongoose

export const reservationSchema = new Schema({
    customerId: String,
    roomId: String,
    checkIn: Date,
    checkOut: Date,
    status: Boolean,
    created_at: { type: Date, default: Date.now },
})