import mongoose from 'mongoose'
import { Status } from '../../models/reservation'
const { Schema } = mongoose

export const reservationSchema = new Schema({
    customerId: String,
    roomId: String,
    checkIn: Date,
    checkOut: Date,
    status: Status,
    created_at: { type: Date, default: Date.now },
})
