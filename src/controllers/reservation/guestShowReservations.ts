import mongoose from 'mongoose'
import { reservationSchema } from '../../db/schemas/reservation'
import { Reservation } from '../../models/reservation'
import { Answer } from '../../models/answer'
import { Context } from 'hono'

export const guestShowReservations = async (c: Context): Promise<Answer> => {
    const ReservationModel = mongoose.model<Reservation>(
        'reservations',
        reservationSchema
    )

    const payload = c.get('jwtPayload')

    console.log(payload)

    try {
        const queriedReservations = await ReservationModel.find({
            customerEmail: payload.email,
        })

        return {
            data: queriedReservations,
            status: 200,
            ok: true,
        }
    } catch (error) {
        console.log('error:' + error)
        return {
            data: error,
            status: 500,
            ok: false,
        }
    }
}
