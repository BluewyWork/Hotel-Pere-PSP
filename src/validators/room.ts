import { z } from 'zod'
import { BedSize, BedType } from '../models/bed'
import { Reserved } from '../models/room'


export const ValidateRoom = z.object({
    number: z.number().int(),
    section: z.string().min(1),
    pricePerNight: z.number().min(0),
    reserved: z.nativeEnum(Reserved),
    image: z.string(),
    bed: z.object({
      bedSize: z.nativeEnum(BedSize),
      bedType: z.nativeEnum(BedType),
    }),
  });


