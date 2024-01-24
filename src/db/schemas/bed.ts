import mongoose from 'mongoose'
import { BedType } from '../../models/bedType'
import { BedSize } from '../../models/bedSize'
const { Schema } = mongoose
export const userSchema = new Schema({
    bedType: BedType,
    bedSize: BedSize,
    created_at: { type: Date, default: Date.now }
})