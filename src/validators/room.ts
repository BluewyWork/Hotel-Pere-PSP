import { z } from 'zod'

export const ValidateRoom = z.object({
    number: z.number(),
    section: z.string().min(1, { message: 'Campo vacio' }).trim(),
    pricePerNigtht: z.number().gt(0, 'Precio invalido'),
    reserved: z.boolean(),
    bed: z.number(),
})
