import mongoose from 'mongoose'
const { Schema } = mongoose

export const guestSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    created_at: { type: Date, default: Date.now },
})
