import { z } from 'zod'
import { BedSize, BedType } from '../models/bed'

export const ValidateRoom = z.object({
    number: z.number(),
    section: z.string().min(1, { message: 'Campo vacio' }).trim(),
    pricePerNigtht: z.number().gt(0, 'Precio invalido'),
    reserved: z.boolean(),
    bed: z.array(
        z.object({
            bedType: z.nativeEnum(BedType),
            bedSize: z.nativeEnum(BedSize),
        })
    ),
})
