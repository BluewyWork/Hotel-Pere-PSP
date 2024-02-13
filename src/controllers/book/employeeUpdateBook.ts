import mongoose from 'mongoose'
import { reservationSchema } from '../../db/schemas/reservation'
import { Answer } from '../../models/answer'
import { Reservation } from '../../models/reservation'

export const employeeUpdateBook = async (c: any): Promise<Answer> => {
    const ReservationModel = mongoose.model<Reservation>(
        'reservation',
        reservationSchema
    )

    const id: string = c.req.param('id')
    const book = (await c.req.json()) as Reservation

    try {
        await ReservationModel.findOneAndUpdate({ _id: id }, book)

        return {
            data: 'Reserva actualizada',
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
