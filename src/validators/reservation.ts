import { z } from 'zod'

export const ValidatorReservation = z.object({
    customerId: z.string(),
    roomId: z.string(),
    checkIn: z.date(),
    checkOut: z.date(),
    status: z.boolean(),
})
