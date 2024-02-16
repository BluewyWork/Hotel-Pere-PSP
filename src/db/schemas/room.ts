import { Schema } from 'mongoose'

export const roomSchema = new Schema({
    // _id: Schema.ObjectId,
    number: Number,
    description: String,
    pricePerNight: Number,
    beds: Number,
    image: String,
    reservedDays: [
        {
            _reservationId: Schema.Types.ObjectId,
            checkIn: Date,
            checkOut: Date,
        },
    ],
})
