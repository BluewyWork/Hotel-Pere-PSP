import mongoose from 'mongoose'
import { reservationSchema } from '../../db/schemas/reservation'
import { Answer } from '../../models/answer'
import { Reservation } from '../../models/reservation'
import { oneMoreDay, parseDateWithMidnight } from '../../utils/dates'

export const employeeShowFilteredReservations = async (
    c: any
): Promise<Answer> => {
    const filter: any = {}

    const guestEmail = c.req.query('email')
    const checkIn = c.req.query('checkIn')
    const checkOut = c.req.query('checkOut')

    if (guestEmail) {
        filter.guestEmail = { $eq: guestEmail }
    }

    if (checkIn && checkOut) {
        const checkInParse = new Date(
            parseDateWithMidnight(oneMoreDay(checkIn))
        )
        const checkOutParse = new Date(
            parseDateWithMidnight(oneMoreDay(checkOut))
        )
        filter.checkIn = { $lte: checkInParse }
        filter.checkOut = { $gte: checkOutParse }
    }

    try {
        const ReservationModel = mongoose.model<Reservation>(
            'reservation',
            reservationSchema
        )
        const reservations = await ReservationModel.find(filter)

        return {
            data: reservations,
            status: 200,
            ok: true,
        }
    } catch (error) {
        return {
            data: 'Error al procesar la solicitud',
            status: 422,
            ok: false,
        }
    }
}
