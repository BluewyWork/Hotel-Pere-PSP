import mongoose from 'mongoose'
const { Schema } = mongoose

export const clientSchema = new Schema({
    name: String,
    email: String,
    password: String,
    created_at: { type: Date, default: Date.now },
})
