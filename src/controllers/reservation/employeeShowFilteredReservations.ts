import mongoose from 'mongoose'
import { reservationSchema } from '../../db/schemas/reservation'
import { Answer } from '../../models/answer'
import { Reservation } from '../../models/reservation'

interface Filter {
    guestEmail?: any
    checkIn?: any
    checkOut?: any
}

export const employeeShowFilteredReservations = async (
    c: any
): Promise<Answer> => {
    const filter: Filter = {}

    const guestEmail = c.req.query('email')
    const checkIn = c.req.query('checkIn')
    const checkOut = c.req.query('checkOut')

    if (guestEmail ?? null) {
        filter.guestEmail = { $eq: guestEmail }
    }

    if (checkIn ?? null) {
        filter.checkIn = { $eq: checkIn }
    }

    if (checkOut ?? false) {
        filter.checkOut = { $eq: checkOut }
    }

    console.log(filter)

    const ReservationModel = mongoose.model<Reservation>(
        'reservation',
        reservationSchema
    )
    const id: string = c.req.param('id')

    try {
        const reservations = await ReservationModel.find(filter)

        if (!reservations) {
            return {
                data: 'La reserva no existe',
                status: 404,
                ok: false,
            }
        }

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
