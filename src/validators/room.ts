import { z } from 'zod'
import { idMongo } from './id'

export const ValidateRoom = z.object({
    _id: idMongo,
    number: z.number(),
    section: z.string().min(1, { message: 'Secion invalida' }).trim(),
    pricePerNight: z.number().gt(0, 'Precio invalido'),
    beds: z.number(),
    image: z.string(),
    reserved: z.boolean(),
    created_at: z.date().optional(),
})
