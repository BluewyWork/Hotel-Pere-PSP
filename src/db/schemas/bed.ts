import mongoose from 'mongoose'
import { BedSize, BedType } from '../../models/bed'
const { Schema } = mongoose

export const bedSchema = new Schema({
    bedType: BedType,
    bedSize: BedSize,
    created_at: { type: Date, default: Date.now },
})
