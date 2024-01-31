import mongoose from 'mongoose'
const { Schema } = mongoose

export const customerSchema = new Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    created_at: { type: Date, default: Date.now },
})
