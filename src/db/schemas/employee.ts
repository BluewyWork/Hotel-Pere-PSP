import { Schema } from 'mongoose'

export const employeeSchema = new Schema({
    _id: Schema.ObjectId,
    name: String,
    surname: String,
    admin: Boolean,
    email: String,
    password: String,
})
