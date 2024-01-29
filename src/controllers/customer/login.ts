import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { Customer } from '../../models/customer'
import { ValidateCustomerLogin } from '../../validators/customer'
import { customerSchema } from '../../db/schemas/customer'
import { verfifyPassword } from '../../utils/auth'
import { setCookie } from 'hono/cookie'
import { sign } from 'hono/jwt'

const CustomerModel = mongoose.model<Customer>('Customer', customerSchema)

export const customerLogin = async (c: any): Promise<Answer> => {
    const customer = (await c.req.json()) as Customer

    const validateCustomer = ValidateCustomerLogin.safeParse(customer)

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

    setCookie(c, 'jwt', await sign(queriedCustomer.email, 'test'), {
        sameSite: 'Lax',
        path: '/',
    })

    return {
        data: 'Inicio de session correcto',
        status: 200,
        ok: true,
    }
}
