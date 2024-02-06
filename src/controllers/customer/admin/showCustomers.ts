import mongoose from 'mongoose'
import { Answer } from '../../../models/answer'
import { User } from '../../../models/user'
import { customerSchema } from '../../../db/schemas/customer'

export const showCustomers = async (c: any): Promise<Answer> => {
    const CustomerModel = mongoose.model<User>('Customer', customerSchema)

    try {
        const queriedCustomers = await CustomerModel.find().exec()

        return {
            data: queriedCustomers,
            status: 200,
            ok: true,
        }
    } catch (error) {
        return {
            data: error,
            status: 500,
            ok: false,
        }
    }
}
