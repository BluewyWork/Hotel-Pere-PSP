import mongoose from 'mongoose'
import { Answer } from '../../../models/answer'
import { customerSchema } from '../../../db/schemas/customer'
import { verfifyPassword } from '../../../utils/auth'
import { setCookie } from 'hono/cookie'
import { sign } from 'hono/jwt'
import { ValidateUserLogin } from '../../../validators/auth'
import { User } from '../../../models/user'
import { Employee } from '../../../models/employee'

export const customerLogin = async (c: any): Promise<Answer> => {
    const CustomerModel = mongoose.model<User>('customers', customerSchema)

    const customer = (await c.req.json()) as User

    const validateCustomer = ValidateUserLogin.safeParse(customer)

    if (!validateCustomer.success) {
        return {
            data: validateCustomer.error.message,
            status: 422,
            ok: false,
        }
    }

    const queriedCustomer = await CustomerModel.findOne({
        email: customer.email,
    }).exec()

    if (!queriedCustomer) {
        return {
            data: 'Invalid Credentials',
            status: 401,
            ok: false,
        }
    }

    const verifyPassword = await verfifyPassword(
        validateCustomer.data.password,
        queriedCustomer.password.toString()
    )

    if (!verifyPassword) {
        return {
            data: 'UwU',
            status: 422,
            ok: false,
        }
    }

    const token = await sign(queriedCustomer.email, process.env.JWT_SECRET!!)

    // setCookie(
    //     c,
    //     'jwt',
    //     token,
    // )

    return {
        data: {
            token,
        },
        status: 200,
        ok: true,
    }
}
