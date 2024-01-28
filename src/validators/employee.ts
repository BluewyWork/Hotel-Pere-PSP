import { z } from 'zod'
export const ValidationEmployee = z.object({
    name: z.string(),
    role: z.boolean(),
    password: z.string(),
    email: z.string()
});
    
