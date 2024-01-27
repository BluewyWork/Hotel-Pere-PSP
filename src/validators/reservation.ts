import {z} from 'zod'
import { Status } from '../models/reservation'


export const ValidateReservation =z.object({
    customerName: z.string(),
    customerEmail: z.string(),
    roomNumber: z.number(),
    roomPrice: z.number(),
    checkIn: z.date(),
    checkOut: z.date(),
    status: z.nativeEnum(Status)
})
   