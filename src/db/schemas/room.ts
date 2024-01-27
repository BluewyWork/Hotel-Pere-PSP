import mongoose from 'mongoose'
import { Bed } from '../../models/bed'
const { Schema } = mongoose

export const roomSchema = new Schema({
    number: Number,
    section: String,
    pricePerNight: Number,
    bed: Array<Bed>,
    created_at: { type: Date, default: Date.now },
})
