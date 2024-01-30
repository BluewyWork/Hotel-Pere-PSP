import mongoose from 'mongoose'
const { Schema } = mongoose

export const billSchema = new Schema({
    customerId: String,
    customerName: String,
    customeEmail: String,
    totalAmount: Number,
    items: Array<Map<String, number>>,
    created_at: { type: Date, default: Date.now },
})
