import { Schema } from 'mongoose'

export const guestSchema = new Schema({
    _id: Schema.ObjectId,
    name: String,
    surname: String,
    email: String,
    image: String,
    password: String,
})
