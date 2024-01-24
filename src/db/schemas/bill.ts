import mongoose from 'mongoose'
const { Schema } = mongoose
export const userSchema = new Schema({
    customerId: String,
    totalAmount: Number,
    items: Array<Map<String, number>>,
    created_at: { type: Date, default: Date.now }
})