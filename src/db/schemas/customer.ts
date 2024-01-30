import mongoose from 'mongoose'
import { Reservation } from '../../models/reservation'
import { Bill } from '../../models/bill'
const { Schema } = mongoose

export const customerSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    created_at: { type: Date, default: Date.now },
})
