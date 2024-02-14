import { Schema } from 'mongoose'

export const billSchema = new Schema({
    // _id: Schema.ObjectId,
    _reservationId: Schema.ObjectId,
    _guestId: Schema.ObjectId,
    guestName: String,
    guestSurname: String,
    guestEmail: String,
    invoice: Number,
    creationDate: Date,
})
