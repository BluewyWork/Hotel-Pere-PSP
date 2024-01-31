import mongoose from 'mongoose'
const { Schema } = mongoose

export const employeeSchema = new Schema({
    name: String,
    admin: Boolean,
    email: String,
    password: String,
})
