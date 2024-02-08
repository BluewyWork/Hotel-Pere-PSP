import { z } from 'zod'
export const ValidateBills = z.object({
    guestId: z.string(),
    guestName: z.string().min(1),
    guestEmail: z.string().min(1),
    totalAmount: z.number().min(0),
    items: z.array(z.map(z.string(), z.number())),
    created_at: z.date().optional(),
})
