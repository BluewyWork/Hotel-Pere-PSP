import { z } from 'zod'

export const ValidatorReservationDates = z.object({
    checkIn: z.date(),
    checkOut: z.date(),
})
