import mongoose from 'mongoose'
import { Bed } from '../../models/bed'
import { Reserved } from '../../models/room'
const { Schema } = mongoose

export const roomSchema = new Schema({
    number: Number,
    section: String,
    pricePerNight: Number,
    reserved: { type: String, enum: Object.values(Reserved)}, 
    image: String,
    bed: Array<Bed>,
    created_at: { type: Date, default: Date.now },
})
