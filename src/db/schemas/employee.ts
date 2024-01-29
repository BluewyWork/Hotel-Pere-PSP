import mongoose from 'mongoose'
const { Schema } = mongoose

export const employeeSchema = new Schema({
    name: String,
    admin: Boolean,
    contact: String,

    created_at: { type: Date, default: Date.now },
})
