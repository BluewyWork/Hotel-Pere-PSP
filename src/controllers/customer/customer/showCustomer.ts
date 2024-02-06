import mongoose from 'mongoose'
import { Answer } from '../../../models/answer'
import { User } from '../../../models/user'
import { customerSchema } from '../../../db/schemas/customer'

export const showClient = async (c: any): Promise<Answer> => {
    const CustomerModel = mongoose.model<User>('Customer', customerSchema)

    const email = c.get('jwtPayload').email

    try {
        const queriedCustomer = await CustomerModel.findOne({
            email: email,
        }).exec()

        return {
            data: queriedCustomer,
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
