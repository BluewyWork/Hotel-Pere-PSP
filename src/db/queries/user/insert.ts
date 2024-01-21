import mongoose from 'mongoose'
import { User } from '../../../models/user'
import { connectDb } from '../../db'
import { clientSchema } from '../../schemas/user'

export const insertUser = async (user: User) => {
    connectDb(() => {
        const User = mongoose.model('Client', clientSchema)

        await User.create(user)
    })
}
