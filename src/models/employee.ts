import { Types } from 'mongoose'

export interface Employee {
    // _id: Types.ObjectId
    name: string
    surname: string
    admin?: boolean
    email: string
    image?: string
    password?: string
}
