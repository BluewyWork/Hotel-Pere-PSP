import { z } from 'zod'

export const ValidationEmployee = z.object({
    name: z.string(),
    surname: z.string(),
    admin: z.boolean(),
    email: z.string(),
    password: z.string(),
})
