import { Types } from 'mongoose'

export interface Guest {
    _id: Types.ObjectId
    name: string
    surname: string
    email: string
    image: string
    password: string
}
