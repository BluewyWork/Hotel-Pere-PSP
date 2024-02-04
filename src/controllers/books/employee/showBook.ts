import mongoose from 'mongoose'
import { reservationSchema } from '../../../db/schemas/reservation'
import { Answer } from '../../../models/answer'
import { Reservation } from '../../../models/reservation'

export const showBook = async (c: any): Promise<Answer> => {
    const ReservationModel = mongoose.model<Reservation>(
        'reservation',
        reservationSchema
    )
    const id: string = c.req.param('id')

    try {
        const book = await ReservationModel.findById(id)

        if (!book) {
            return {
                data: 'La reserva no existe',
                status: 404,
                ok: false,
            }
        }

        return {
            data: book,
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
