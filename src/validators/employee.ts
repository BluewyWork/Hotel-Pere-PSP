import { z } from 'zod'
export const ValidationEmployee = z.object({
    name: z.string(),
    admin: z.boolean(),
    email: z.string(),
    password: z.string(),
    password_confirm: z.string().optional(),
})
