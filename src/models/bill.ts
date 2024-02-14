import { Types } from 'mongoose'

export interface Bill {
    _id: Types.ObjectId
    guestName: String
    guestSurname: String
    guestEmail: String
    invoice: number
    items: Array<[String, number]>
    creationDate: Date
}
