import { z } from 'zod'
import { Customer } from '../models/customer'

export const ValidateCustomerLogin = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    password: z.string(),
})
