import { z } from 'zod'
import { idMongo } from './id'

export const ValidatorReservation = z.object({
    _id: idMongo,
    customerId: z.string(),
    roomId: z.string(),
    checkIn: z.date(),
    checkOut: z.date(),
    status: z.boolean(),
    created_at: z.date().optional(),
})
