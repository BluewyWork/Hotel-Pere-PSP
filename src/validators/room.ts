import { z } from 'zod'
import { idMongo } from './id'

export const ValidateRoom = z.object({
    // _id: idMongo,
    number: z.number(),
    description: z.string().min(1, { message: 'Invalid Description' }).trim(),
    pricePerNight: z.number().gt(0, 'Precio invalido'),
    beds: z.number(),
    // image: z.string(),
    reservedDays: z.any(),
})
