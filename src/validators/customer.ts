import { z } from 'zod'
export const ValidateCustomer = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string()
})