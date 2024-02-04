import mongoose from 'mongoose'
import { reservationSchema } from '../../../db/schemas/reservation'
import { Answer } from '../../../models/answer'
import { Reservation } from '../../../models/reservation'

export const showBooks = async (c: any): Promise<Answer> => {
    const ReservationModel = mongoose.model<Reservation>(
        'reservation',
        reservationSchema
    )

    try {
        const books = await ReservationModel.find()

        return {
            data: books,
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
