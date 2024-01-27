import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { Customer } from '../../models/customer'
import { ValidateCustomerLogin } from '../../validators/customer'
import { customerSchema } from '../../db/schemas/customer'
import { verfifyPassword } from '../../utils/auth'

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

    const queriedCustomer = CustomerModel.findOne({
        email: customer.email,
    }).exec()

    if (!queriedCustomer) {
        return {
            data: 'Invalid Credential',
            status: 401,
            ok: false,
        }
    }

    console.log(queriedCustomer)

    return {
        data: '...',
        status: 400,
        ok: false,
    }
}
