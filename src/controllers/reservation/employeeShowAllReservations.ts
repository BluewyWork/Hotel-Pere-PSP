import mongoose from 'mongoose'
import { reservationSchema } from '../../db/schemas/reservation'
import { Answer } from '../../models/answer'
import { Reservation } from '../../models/reservation'

export const employeeShowAllReservations = async (c: any): Promise<Answer> => {
    const ReservationModel = mongoose.model<Reservation>(
        'reservations',
        reservationSchema
    )

    try {
        const queriedReservations = await ReservationModel.find().exec()

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
