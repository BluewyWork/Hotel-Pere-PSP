import mongoose from 'mongoose'
const { Schema } = mongoose

export const roomSchema = new Schema({
    number: Number,
    section: String,
    pricePerNight: Number,
    bed: Number,
    created_at: { type: Date, default: Date.now },
})
