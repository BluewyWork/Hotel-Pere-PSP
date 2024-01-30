import mongoose from 'mongoose'
const { Schema } = mongoose

export const employeeSchema = new Schema({
    name: String,
    admin: Boolean,
    email: String,
    contact: String,
    password: String,
    created_at: { type: Date, default: Date.now },
})
