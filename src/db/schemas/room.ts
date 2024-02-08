import mongoose from 'mongoose'
const { Schema } = mongoose

export const roomSchema = new Schema({
    number: Number,
    section: String,
    pricePerNight: Number,
    beds: Number,
    image: String,
    reserved: Boolean,
    created_at: { type: Date, default: Date.now },
})
